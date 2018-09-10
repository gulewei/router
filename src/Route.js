import { h } from 'hyperapp'
import parseRoute from './parse-route'
import { pathOf } from './path-of'

function Route (props) {
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

export default Route
