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

  var subscribe = function subscribe(main) {
    return history.listen(function (location) {
      exports.pathOf(main).onChange({ location: location });
    });
  };

  return {
    state: state,
    actions: actions,
    subscribe: subscribe
  };
}

var SESSION_KEY = '_hoa_router_session';
var store = window.sessionStorage;
var getSession = function getSession(key) {
  return JSON.parse(store.getItem(key));
};
var setSession = function setSession(key, val) {
  return store.setItem(key, JSON.stringify(val));
};

function sessionFactory(history) {
  var sessionKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SESSION_KEY;

  return {
    state: {
      stack: getSession(sessionKey) || [history.location]
    },
    actions: {
      onSessionChange: function onSessionChange(_ref) {
        var location = _ref.location,
            action = _ref.action;
        return function (_ref2) {
          var stack = _ref2.stack;

          var nextStack = void 0;
          switch (action) {
            case 'PUSH':
              nextStack = stack.concat(location);
              break;
            case 'REPLACE':
              nextStack = stack.slice(0, -1).concat(location);
              break;
            case 'POP':
            default:
              nextStack = stack;
          }
          setSession(sessionKey, nextStack);
          return { stack: nextStack };
        };
      }
    },
    subscribe: function subscribe(main) {
      return history.listen(function (location, action) {
        exports.pathOf(main).onSessionChange({ location: location, action: action });
      });
    }
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

var NAME = 'router';

function withRouter(app, _ref) {
    var _ref$name = _ref.name,
        name = _ref$name === undefined ? NAME : _ref$name,
        history = _ref.history;

    return function appWraper(state, actions, view, root) {
        initPathFn(name);

        var router = routerFactory(history);

        state[name] = router.state;
        actions[name] = router.actions;

        var main = app(state, actions, view, root);

        router.subscribe(main);

        return main;
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

var NAME$1 = 'router';

function withSession(app, _ref) {
    var _ref$name = _ref.name,
        name = _ref$name === undefined ? NAME$1 : _ref$name,
        history = _ref.history;

    return function appWraper(state, actions, view, root) {
        initPathFn(name);

        var router = routerFactory(history);
        var session = sessionFactory(history);

        state[name] = _extends({}, router.state, session.state);
        actions[name] = _extends({}, router.actions, session.actions);

        var main = app(state, actions, view, root);

        router.subscribe(main);
        session.subscribe(main);

        return main;
    };
}

exports.Link = Link;
exports.init = initPathFn;
exports.Redirect = Redirect;
exports.Route = Route;
exports.routerFactory = routerFactory;
exports.sessionFactory = sessionFactory;
exports.Switch = Switch;
exports.withRouter = withRouter;
exports.withSession = withSession;

Object.defineProperty(exports, '__esModule', { value: true });

})));
