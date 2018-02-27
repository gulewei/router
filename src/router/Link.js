import { h } from 'hyperapp'
import { getGlobalContext } from './context'
import { createLocation } from 'history'

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

/**
 * @typedef {Object} LinkProps
 * @prop {string | Object} to
 * @prop {boolean} [replace=false]
 * @param {LinkProps} props 
 * @param {JSX.Element[]} children 
 */
export function Link (props, children) {
  const { replace, to, onclick, } = props
  const { history } = getGlobalContext()
  const loc =
    typeof to === "string"
      ? createLocation(to, null, null, history.location)
      : to;

  props.href = history.createHref(loc)
  props.onclick = function (e) {
    if (onclick) { onclick(e) }

    if (
      !e.defaultPrevented && // onClick prevented default
      e.button === 0 && // ignore everything but left clicks
      !props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(e) // ignore clicks with modifier keys
    ) {
      e.preventDefault();

      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    }
  }

  return h("a", props, children)
}
