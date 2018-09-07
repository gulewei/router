(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('hyperapp')) :
  typeof define === 'function' && define.amd ? define(['exports', 'hyperapp'], factory) :
  (factory((global.HoaRouter = {}),global.hyperapp));
}(this, (function (exports,hyperapp) { 'use strict';

  function createMatch(isExact, path, url, params) {
    return {
      isExact: isExact,
      path: path,
      url: url,
      params: params
    };
  }

  function trimTrailingSlash(url) {
    for (var len = url.length; "/" === url[--len];) {}
    return url.slice(0, len + 1);
  }

  function decodeParam(val) {
    try {
      return decodeURIComponent(val);
    } catch (e) {
      return val;
    }
  }

  function parseRoute(path, url, options) {
    if (path === url || !path) {
      return createMatch(path === url, path, url);
    }

    var exact = options && options.exact;
    var paths = trimTrailingSlash(path).split("/");
    var urls = trimTrailingSlash(url).split("/");

    if (paths.length > urls.length || exact && paths.length < urls.length) {
      return;
    }

    for (var i = 0, params = {}, len = paths.length, url = ""; i < len; i++) {
      if (":" === paths[i][0]) {
        params[paths[i].slice(1)] = urls[i] = decodeParam(urls[i]);
      } else if (paths[i] !== urls[i]) {
        return;
      }
      url += urls[i] + "/";
    }

    return createMatch(false, path, url.slice(0, -1), params);
  }

  // ==== Factory ======

  var pathOf = void 0;
  var hook = function hook() {};

  function initPathFn(pathFn) {
    if (!pathOf) {
      pathOf = pathFn;
    }
  }

  function routerFactory(_ref) {
    var pathFn = _ref.pathFn,
        history = _ref.history,
        state = _ref.state,
        _ref$beforeChange = _ref.beforeChange,
        beforeChange = _ref$beforeChange === undefined ? hook : _ref$beforeChange,
        _ref$afterChange = _ref.afterChange,
        afterChange = _ref$afterChange === undefined ? hook : _ref$afterChange;

    initPathFn(pathFn);

    var path = history.location.pathname;

    var actions = {
      push: function push(path) {
        history.push(path);
      },
      replace: function replace(path) {
        history.replace(path);
      },
      onChange: function onChange(_ref2) {
        var location = _ref2.location,
            action = _ref2.action;
        return function (state) {
          return nextState(location.pathname, state.pathname, action, state.sessions);
        };
      }
    };

    var subscribe = function subscribe(actions) {
      history.listen(function (location, ACTION) {
        if (!beforeChange(actions, pathOf, history)) {
          pathOf(actions).onChange({ location: location, action: ACTION });
          afterChange(actions, pathOf, history);
        }
      });
      return actions;
    };

    return {
      state: state || stateFactory(path, path, [path], enmuDirection.none),
      actions: actions,
      subscribe: subscribe
    };
  }

  var enmuDirection = {
    backward: 0,
    forward: 1,
    none: 2
  };

  var stateFactory = function stateFactory(pathname, previous, sessions, direction) {
    return { pathname: pathname, previous: previous, sessions: sessions, direction: direction };
  };

  var nextState = function nextState(pathname, previous, action, sessions) {
    var contained = sessions.indexOf(pathname) > -1;
    var direction = { POP: 0, PUSH: 1, REPLACE: 2 }[action] + (contained ? 0 : 1);
    var forward = function forward() {
      return sessions.concat(pathname);
    };
    var backward = function backward() {
      return sessions.slice(0, -1);
    };
    var none = function none() {
      return sessions.slice(0, -1).concat(pathname);
    };
    sessions = [backward, forward, none][direction]();
    return stateFactory(pathname, previous, sessions, direction);
  };

  // ==== components ======


  function Switch(props, children) {
    return function (state, actions) {
      var child,
          i = 0;
      while (!(child = children[i] && children[i](state, actions)) && i < children.length) {
        i++;
      }return child;
    };
  }

  function Route(props) {
    return function (state, actions) {
      var state = pathOf(state);
      var match = parseRoute(props.path, state.pathname, {
        exact: !props.parent
      });

      return match && props.render({
        match: match,
        state: state
      });
    };
  }

  function Redirect(props) {
    return function (state, actions) {
      pathOf(actions).replace(props.to);
    };
  }

  /**
   *
   * @param {Location | HTMLAnchorElement} loc 
   */
  function getOrigin(loc) {
    return loc.protocol + "//" + loc.hostname + (loc.port ? ":" + loc.port : "");
  }

  /**
   *
   * @param {HTMLAnchorElement} anchorElement 
   */
  function isExternal(anchorElement) {
    // Location.origin and HTMLAnchorElement.origin are not supported by IE and Safari.
    return getOrigin(window.location) !== getOrigin(anchorElement);
  }

  function Link(props, children) {
    return function (state, actions) {
      var to = props.to;
      var onclick = props.onclick;
      delete props.to;
      delete props.location;

      props.href = to;
      props.onclick = function (e) {
        if (onclick) {
          onclick(e);
        }
        if (e.defaultPrevented || e.button !== 0 || e.altKey || e.metaKey || e.ctrlKey || e.shiftKey || props.target === "_blank" || isExternal(e.currentTarget)) ; else {
          e.preventDefault();

          if (to !== pathOf(state).pathname) {
            pathOf(actions).push(to);
          }
        }
      };

      return hyperapp.h("a", props, children);
    };
  }

  function withRouter(app) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'router';
    var config = arguments[2];

    return function (state, actions, view, root) {
      initPathFn(function (state) {
        return state[name];
      });

      var _routerFactory = routerFactory(config),
          subscribe = _routerFactory.subscribe,
          routerState = _routerFactory.state,
          routerActions = _routerFactory.actions;

      state[name] = routerState;
      actions[name] = routerActions;

      return subscribe(app(state, actions, view, root));
    };
  }

  exports.withRouter = withRouter;
  exports.initPathFn = initPathFn;
  exports.routerFactory = routerFactory;
  exports.enmuDirection = enmuDirection;
  exports.Switch = Switch;
  exports.Route = Route;
  exports.Redirect = Redirect;
  exports.Link = Link;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
