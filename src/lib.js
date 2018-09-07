import { h } from 'hyperapp'
import { parseRoute } from './parse-route'

// ==== Factory ======

let pathOf
const hook = () => { }

export function initPathFn (pathFn) {
  if (!pathOf) {
    pathOf = pathFn
  }
}

export function routerFactory ({ pathFn, history, state, beforeChange = hook, afterChange = hook }) {
  initPathFn(pathFn)

  const path = history.location.pathname

  const actions = {
    push: (path) => {
      history.push(path)
    },
    replace: (path) => {
      history.replace(path)
    },
    onChange: ({ location, action }) => (state) => {
      return nextState(location.pathname, state.pathname, action, state.sessions)
    }
  }

  const subscribe = (actions) => {
    history.listen((location, ACTION) => {
      if (!beforeChange(actions, pathOf, history)) {
        pathOf(actions).onChange({ location, action: ACTION })
        afterChange(actions, pathOf, history)
      }
    })
    return actions
  }

  return {
    state: state || stateFactory(path, path, [path], enmuDirection.none),
    actions,
    subscribe
  }
}

export const enmuDirection = {
  backward: 0,
  forward: 1,
  none: 2
}

const stateFactory = (pathname, previous, sessions, direction) => ({ pathname, previous, sessions, direction })

const nextState = (pathname, previous, action, sessions) => {
  const contained = sessions.indexOf(pathname) > -1
  const direction = ({ POP: 0, PUSH: 1, REPLACE: 2 }[action]) + (contained ? 0 : 1)
  const forward = () => sessions.concat(pathname)
  const backward = () => sessions.slice(0, -1)
  const none = () => sessions.slice(0, -1).concat(pathname)
  sessions = [backward, forward, none][direction]()
  return stateFactory(pathname, previous, sessions, direction)
}


// ==== components ======


export function Switch (props, children) {
  return function (state, actions) {
    var child,
      i = 0
    while (
      !(child = children[i] && children[i](state, actions)) &&
      i < children.length
    )
      i++
    return child
  }
}

export function Route (props) {
  return function (state, actions) {
    var state = pathOf(state)
    var match = parseRoute(props.path, state.pathname, {
      exact: !props.parent
    })

    return (
      match &&
      props.render({
        match: match,
        state: state
      })
    )
  }
}

export function Redirect (props) {
  return function (state, actions) {
    pathOf(actions).replace(props.to)
  }
}

/**
 *
 * @param {Location | HTMLAnchorElement} loc 
 */
function getOrigin (loc) {
  return loc.protocol + "//" + loc.hostname + (loc.port ? ":" + loc.port : "")
}

/**
 *
 * @param {HTMLAnchorElement} anchorElement 
 */
function isExternal (anchorElement) {
  // Location.origin and HTMLAnchorElement.origin are not supported by IE and Safari.
  return getOrigin(window.location) !== getOrigin(anchorElement)
}

export function Link (props, children) {
  return function (state, actions) {
    var to = props.to
    var onclick = props.onclick
    delete props.to
    delete props.location

    props.href = to
    props.onclick = function (e) {
      if (onclick) {
        onclick(e)
      }
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.altKey ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        props.target === "_blank" ||
        isExternal(e.currentTarget)
      ) {
      } else {
        e.preventDefault()

        if (to !== pathOf(state).pathname) {
          pathOf(actions).push(to)
        }
      }
    }

    return h("a", props, children)
  }
}
