import { h } from 'hyperapp'
import { Route, Switch, Link } from '../../src'
import { BackButton, LinkWithBlock } from './Links'
import Page from './Page'

const HomePage = () => {
  return (
    <Page key="home">
      <h1 class="page-header">Hi .</h1>
      <Link class="page-link" to="/list">list</Link>
    </Page>
  )
}

const ListPage = () => (
  <Page key="list">
    <h1 class="page-header">List .</h1>
    <BackButton />
    <Link class="page-link" to="/item/123">item: 123</Link>
    <Link class="page-link" to="/item/124">item: 124</Link>
    <Link class="page-link" to="/item/125">item: 125</Link>
    <Link class="page-link" to="/item/126">item: 126</Link>
  </Page>
)

const ItemPage = ({ match }) => (
  <Page key="item">
    <h1 class="page-header">Item: {match.params.id}</h1>
    <BackButton />
    {/* <LinkWithBlock /> */}
    <Link class="page-link" to="/operation">operation</Link>
  </Page>
)

const OperationPage = () => (
  <Page key='operation'>
    <h1 class="page-header">Operation .</h1>
    <BackButton />
    <Link class="page-link" to="/result">result</Link>
    {/* <Link class="direct-home-link" to='/'>home</Link> */}
  </Page>
)

const ResultPage = () => (
  <Page key='result'>
    <h1 class="page-header">Result .</h1>
    <BackButton />
    <Link class="page-link" to="/">Home</Link>
    {/* <Link class="direct-home-link" to='/'>home</Link> */}
  </Page>
)

const App = (state, actions) => {
  window.$state = state
  window.$actions = actions

  return (
    <Switch>
      <Route path='/' render={HomePage} />
      <Route path='/list' render={ListPage} />
      <Route path='/item/:id' render={ItemPage} />
      <Route path='/operation' render={OperationPage} />
      <Route path='/result' render={ResultPage} />
    </Switch>
  )
}

export default App
