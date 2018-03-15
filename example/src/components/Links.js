import { h } from 'hyperapp'
import { history } from '../store'
import { Link } from 'hyperapp-hoa-router'

const BackButton = () => (
  <button class='back-button' onclick={() => history.goBack()}>back</button>
)

const withBlock = () => {
  let unblock = history.block((location, action) => {
    // return 'sdfsdfsdfsd'
  })
}

const LinkWithBlock = () => {
  return <Link class="link-with-block" onclick={withBlock} to='/result' >link with block</Link>
}

export {
  BackButton,
  LinkWithBlock
}