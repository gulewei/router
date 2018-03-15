import { h } from 'hyperapp'
import { Route, Switch, Link } from '../modules/router'
import { BackLink, LinkWithBlock } from './Links'

const HomePage = () => {
  return (
    <Page key="home-page">
      <h1>Hi .</h1>
      <Link to="/list.html">list</Link>
    </Page>
  )
}

const ListPage = () => (
  <Page key='list-page'>
    <h1>List .</h1>
    <BackLink />
    <br />
    <Link to="/item?id=123">item</Link>
    <br />
    <Link to="/item?id=124">item</Link>
    <br />
    <Link to="/item?id=125">item</Link>
    <br />
    <Link to="/item?id=126">item</Link>
    <br />
    <Link to='/'>home</Link>
  </Page>
)

const ItemPage = () => (
  <div class="page-container item-page" key='item-page'>
    <h1>Item .</h1>
    <BackLink />
    <br />
    <LinkWithBlock />
    <br />
    <Link to="/operation">operation</Link>
    <br />
    <Link to='/'>home</Link>
  </div>
)

const OperationPage = () => (
  <div class="page-container operation-page" key='operation-page'>
    <h1>Operation .</h1>
    <BackLink />
    <br />
    <Link to="/result">result</Link>
    <br />
    <Link to='/'>home</Link>
  </div>
)

const ResultPage = () => (
  <div class="page-container result-page" key='result-page'>
    <h1>Result .</h1>
    <BackLink />
    <br />
    <Link to="/">Home</Link>
    <br />
    <Link to='/'>home</Link>
  </div>
)

const App = (state, actions) => {
  window.$state = state
  window.$actions = actions

  return (
    <Switch>
      <Route path='/' render={HomePage} />
      <Route path='/list.html' render={ListPage} />
      <Route path='/item' render={ItemPage} />
      <Route path='/operation' render={OperationPage} />
      <Route path='/result' render={ResultPage} />
    </Switch>
  )
}

export default App
