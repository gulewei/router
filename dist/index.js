(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('hyperapp'), require('history')) :
	typeof define === 'function' && define.amd ? define(['exports', 'hyperapp', 'history'], factory) :
	(factory((global.HoaRouter = {}),global.hyperapp,global.History));
}(this, (function (exports,hyperapp,history) { 'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function modifyUrl(_ref) {
  var newUrl = _ref.newUrl,
      type = _ref.type;

  return function (state) {
    switch (type) {
      case 'PUSH':
        return {
          urls: state.urls.concat(newUrl),
          index: state.index += 1
        };
      case 'REPLACE':
        return {
          urls: state.urls.slice(0, -1).concat(newUrl),
          index: state.index
        };
      case 'POP':
        var popIndex = state.urls.indexOf(newUrl);

        if (popIndex < 0) {
          return {
            urls: [newUrl].concat(state.urls),
            index: 0
          };
        }

        return {
          urls: state.urls,
          index: popIndex
        };
      default:
        return state;
    }
  };
}

function createRouter(history$$1) {
  return {
    state: {
      urls: [history$$1.location.pathname],
      index: 0
    },
    actions: {
      modifyUrl: modifyUrl,
      callHistoryMethod: function callHistoryMethod(_ref2) {
        var method = _ref2.method,
            args = _ref2.args;

        history$$1[method].apply(history$$1, _toConsumableArray(args));
      }
    },
    subscribe: function subscribe(appActions) {
      return history$$1.listen(function (location, type) {
        appActions.modifyUrl({ url: location.pathname, type: type });
      });
    }
  };
}

var globalContext = {
  history: {}
};

function getGlobalContext() {
  return globalContext;
}

function setGlobalContext(context) {
  globalContext.history = context.history;
  return globalContext;
}

function withSubscribe(app) {
  return function createAppWithSubscription(state, actions, view, rootEl, subscribe) {
    var appActions = app(state, actions, view, rootEl);
    subscribe && subscribe(appActions);
    return appActions;
  };
}

function withRouter(app, history$$1) {
  setGlobalContext({ history: history$$1 });

  return function createAppWithRouter(state, actions, view, rootEl, subscribe) {
    var router = createRouter(history$$1);
    // let wraperState = { ...state, router: router.state }
    // let wraperActions = { ...actions, router: router.actions }
    state.router = router.state;
    actions.router = router.actions;

    return withSubscribe(app)(state, actions, view, rootEl, function (appActions) {
      router.subscribe(appActions.router);
      subscribe && subscribe(appActions);
    });
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

  // eslint-disable-next-line
  for (var i = 0, params = {}, len = paths.length, url = ""; i < len; i++) {
    if (":" === paths[i][0]) {
      try {
        params[paths[i].slice(1)] = urls[i] = decodeURI(urls[i]);
      } catch (_) {
        continue;
      }
    } else if (paths[i] !== urls[i]) {
      return;
    }
    url += urls[i] + "/";
  }

  return createMatch(false, path, url.slice(0, -1), params);
}

function Route(props) {
  var _getGlobalContext = getGlobalContext(),
      history$$1 = _getGlobalContext.history;

  var loc = props.location || history$$1.location;
  var match = parseRoute(props.path, loc.pathname, {
    exact: !props.parent
  });

  return match && props.render({
    match: match,
    location: loc
  });
}

var isModifiedEvent = function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

/**
 * @typedef {Object} LinkProps
 * @prop {string | Object} to
 * @prop {boolean} [replace=false]
 * @param {LinkProps} props 
 * @param {JSX.Element[]} children 
 */
function Link(props, children) {
  var replace = props.replace,
      to = props.to,
      onclick = props.onclick;

  var _getGlobalContext = getGlobalContext(),
      history$$1 = _getGlobalContext.history;

  var loc = typeof to === "string" ? history.createLocation(to, null, null, history$$1.location) : to;

  props.href = history$$1.createHref(loc);
  props.onclick = function (e) {
    if (onclick) {
      onclick(e);
    }

    if (!e.defaultPrevented && // onClick prevented default
    e.button === 0 && // ignore everything but left clicks
    !props.target && // let browser handle "target=_blank" etc.
    !isModifiedEvent(e) // ignore clicks with modifier keys
    ) {
        e.preventDefault();

        if (replace) {
          history$$1.replace(to);
        } else {
          history$$1.push(to);
        }
      }
  };

  return hyperapp.h("a", props, children);
}

/**
 * TODO: support Redirect 
 * @param {*} props 
 * @param {*} children 
 */

function Switch(props, children) {
  var i = 0;
  while (!children[i] && i < children.length) {
    i++;
  }return children[i];
}

/**
 * TODO: add a [from] prop which can be used in Switch
 * @typedef {Object} RedirectProps
 * @prop {string | Object} to
 * @prop {boolean} [push=false]
 * @param {RedirectProps} props 
 */
function Redirect(props) {
  var _getGlobalContext = getGlobalContext(),
      history$$1 = _getGlobalContext.history;

  var to = props.to,
      push = props.push;

  push ? history$$1.push(to) : history$$1.replace(to);
}

exports.withRouter = withRouter;
exports.withSubscribe = withSubscribe;
exports.createRouter = createRouter;
exports.Route = Route;
exports.Link = Link;
exports.Switch = Switch;
exports.Redirect = Redirect;

Object.defineProperty(exports, '__esModule', { value: true });

})));
