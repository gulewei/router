import { createRouter } from '../router/router'

function withRouter (app, history) {
  const myRouter = createRouter(history)
  return function createAppWithRouter (state, actions, view, rootEl) {
    state.router = myRouter.state
    actions.router = myRouter.actions
    const appActions = app(state, actions, view, rootEl)
    myRouter.subscribe(appActions.router)
    return appActions
  }
}

export {
  withRouter
}