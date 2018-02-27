import { h, app } from "hyperapp"
import { withRouter, getGlobalContext, Link, Route, Switch } from './router'

const state = {}

const actions = {}

const historyBack = () => {
  let { history } = getGlobalContext()
  history.goBack()
}

const withBlock = () => {
  let { history } = getGlobalContext()
  let unblock = history.block((location, action) => {
    // return 'sdfsdfsdfsd'
  })
}

const BackLink = () => (
  <button onclick={historyBack}>back</button>
)

const LinkWithBlock = () => {
  return <Link onclick={withBlock} to='/result' >link with block</Link>
}

const HomePage = () => (
  <div class="page-container" key='home-page'>
    <h1>Hi .</h1>
    <Link to="/list.html">list</Link>
  </div>
)

const ListPage = () => (
  <div class="page-container" key='list-page'>
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
  </div>
)

const ItemPage = () => (
  <div class="page-container" key='item-page'>
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
  <div class="page-container" key='operation-page'>
    <h1>Operation .</h1>
    <BackLink />
    <br />
    <Link to="/result">result</Link>
    <br />
    <Link to='/'>home</Link>
  </div>
)

const ResultPage = () => (
  <div class="page-container" key='result-page'>
    <h1>Result .</h1>
    <BackLink />
    <br />
    <Link to="/">Home</Link>
    <br />
    <Link to='/'>home</Link>
  </div>
)

const view = (state, actions) => {
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

const options = {
  hashType: 'hashbang',
  // basename: '/app'
}

withRouter(app, options)(state, actions, view, document.body)
