(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('hyperapp')) :
	typeof define === 'function' && define.amd ? define(['exports', 'hyperapp'], factory) :
	(factory((global.HoaRouter = {}),global.hyperapp));
}(this, (function (exports,hyperapp) { 'use strict';

exports.pathOf = void 0;

function initPathFn(name) {
  if (!exports.pathOf) {
    exports.pathOf = function pathOf(s) {
      return s[name];
    };
  }
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
      if (e.defaultPrevented || e.button !== 0 || e.altKey || e.metaKey || e.ctrlKey || e.shiftKey || props.target === "_blank" || isExternal(e.currentTarget)) {} else {
        e.preventDefault();

        if (to !== exports.pathOf(state).pathname) {
          exports.pathOf(actions).push(to);
        }
      }
    };

    return hyperapp.h("a", props, children);
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

function Redirect(props) {
  return function (state, actions) {
    exports.pathOf(actions).replace(props.to);
  };
}

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

function Route(props) {
  return function (state) {
    var state = exports.pathOf(state);
    var match = parseRoute(props.path, state.pathname, {
      exact: !props.parent
    });

    return match && props.render({
      match: match,
      state: state
    });
  };
}

function routerFactory(history) {
  var state = {
    pathname: history.location.pathname,
    previous: null
  };

  var actions = {
    push: function push(path) {
      history.push(path);
    },
    replace: function replace(path) {
      history.replace(path);
    },
    onChange: function onChange(_ref) {
      var location = _ref.location;
      return function (_ref2) {
        var previous = _ref2.pathname;

        return {
          pathname: location.pathname,
          previous: previous
        };
      };
    }
  };

  var sub = function sub(main) {
    return history.listen(function (location) {
      exports.pathOf(main).onChange({ location: location });
    });
  };

  return {
    state: state,
    actions: actions,
    sub: sub
  };
}

function Switch(children) {
  return function (state, actions) {
    var child,
        i = 0;
    while (!(child = children[i] && children[i](state, actions)) && i < children.length) {
      i++;
    }return child;
  };
}

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * @param {{state: Object, actions: Object, sub: () => Function}[]} factories
 */
function combineFactories(factories) {
  return factories.reduce(function (_ref, _ref2) {
    var prevState = _ref.state,
        prevActions = _ref.actions,
        subs = _ref.subs;
    var state = _ref2.state,
        actions = _ref2.actions,
        sub = _ref2.sub;

    return {
      state: _extends({}, prevState, state),
      actions: _extends({}, prevActions, actions),
      subs: subs.concat(sub)
    };
  }, { state: {}, actions: {}, subs: [] });
}

var NAME = 'router';

function withRouter(app, _ref3) {
  var _ref3$moduleName = _ref3.moduleName,
      moduleName = _ref3$moduleName === undefined ? NAME : _ref3$moduleName,
      _ref3$unSubName = _ref3.unSubName,
      unSubName = _ref3$unSubName === undefined ? 'unSubAll' : _ref3$unSubName,
      _ref3$factories = _ref3.factories,
      factories = _ref3$factories === undefined ? [] : _ref3$factories;

  return function appWraper(state, actions, view, root) {
    initPathFn(moduleName);

    var factory = combineFactories(factories);
    state[moduleName] = factory.state;
    actions[moduleName] = factory.actions;

    var main = app(state, actions, view, root);
    var unSubs = factory.subs.map(function (sub) {
      return sub(main);
    });

    main[unSubName] = function () {
      return unSubs.map(function (unSub) {
        return unSub();
      });
    };

    return main;
  };
}

exports.Link = Link;
exports.init = initPathFn;
exports.Redirect = Redirect;
exports.Route = Route;
exports.routerFactory = routerFactory;
exports.Switch = Switch;
exports.withRouter = withRouter;

Object.defineProperty(exports, '__esModule', { value: true });

})));
