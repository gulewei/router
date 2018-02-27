import { parseRoute } from "./parseRoute"
import { getGlobalContext } from '../context'

export function Route (props) {
  var { history } = getGlobalContext()
  var loc = props.location || history.location
  var match = parseRoute(props.path, loc.pathname, {
    exact: !props.parent
  })

  return (
    match &&
    props.render({
      match: match,
      location: loc
    })
  )
}
