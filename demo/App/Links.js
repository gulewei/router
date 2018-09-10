import { h } from 'hyperapp'
import { history } from '../router'
import { Link, pathOf } from '../../src'

const HomeLink = () => (state) => {
  return (
    <a
      class='page-link'
      onclick={() => {
        const stack = pathOf(state).stack.map(loc => loc.pathname)
        history.go(
          stack.indexOf('/') - stack.indexOf(history.location.pathname)
        )
      }}
    >
      Back home
  </a>
  )
}

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
  HomeLink,
  BackButton,
  LinkWithBlock
}