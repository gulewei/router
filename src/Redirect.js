import { h } from 'hyperapp'
import { pathOf } from './path-of'

function Redirect (props) {
  return function (state, actions) {
    pathOf(actions).replace(props.to)
  }
}

export default Redirect
