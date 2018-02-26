import { getGlobalContext } from './context'

/**
 * @typedef {Object} RedirectProps
 * @prop {string | Object} to
 * @prop {boolean} [push=false]
 * @param {RedirectProps} props 
 */
export function Redirect (props) {
  let { history } = getGlobalContext()
  let { to, push } = props
  push ? history.push(to) : history.replace(to)
}
