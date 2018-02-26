import { getGlobalContext } from './context'

export function Redirect (props) {
  var { history } = getGlobalContext()
  var loc = props.location || history.location
  history.replaceState(props.from || loc.pathname, "", props.to)
}
