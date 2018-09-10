import { h } from 'hyperapp'
import { pathOf } from './path-of'

function Link (props, children) {
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

export default Link
