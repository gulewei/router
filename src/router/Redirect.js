import { getGlobalContext } from '../context'

/**
 * TODO: add a [from] prop which can be used in Switch
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
