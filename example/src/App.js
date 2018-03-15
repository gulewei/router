import { h } from 'hyperapp'
import { HomePage, ListPage, ItemPage, OperationPage, ResultPage } from './pages'
import { Route, Switch } from 'hyperapp-hoa-router'

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
