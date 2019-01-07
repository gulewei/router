import { h } from 'hyperapp'
import { history } from '../router'
import { Link, pathOf } from '../../src'

const HomeLink = () => (_, actions) => {
  return (
    <a
      class='page-link'
      onclick={() => {
        pathOf(actions).popTo('/')
      }}
    >
      Back home
  </a>
  )
}

const BackButton = () => (
  <button class='back-button' onclick={() => window.history.back()}>back</button>
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