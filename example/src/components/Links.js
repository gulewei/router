import { h } from 'hyperapp'
import { history } from '../store'
import { Link } from '../modules/router'

const BackLink = () => (
  <button onclick={() => history.goBack()}>back</button>
)

const withBlock = () => {
  let unblock = history.block((location, action) => {
    // return 'sdfsdfsdfsd'
  })
}

const LinkWithBlock = () => {
  return <Link onclick={withBlock} to='/result' >link with block</Link>
}

export {
  BackLink,
  LinkWithBlock
}