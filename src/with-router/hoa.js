import { createRouter } from '../router/router'

function withRouter (app, history) {
  const myRouter = createRouter(history)
  return function createAppWithRouter (state, actions, view, rootEl) {
    state._router = myRouter.state
    actions._router = myRouter.actions
    const appActions = app(state, actions, view, rootEl)
    myRouter.subscribe(appActions._router)
    return appActions
  }
}

export {
  withRouter
}