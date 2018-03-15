import { createRouter } from '../router/router'

function withSubscribe (app) {
  return function createAppWithSubscription (state, actions, view, rootEl, subscribe) {
    let appActions = app(state, actions, view, rootEl)
    subscribe && subscribe(appActions)
    return appActions
  }
}

function withRouter (app, history) {
  return function createAppWithRouter (state, actions, view, rootEl, subscribe) {
    const myRouter = createRouter(history)

    state.router = myRouter.state
    actions.router = myRouter.actions

    return withSubscribe(app)(
      state,
      actions,
      view,
      rootEl,
      appActions => {
        myRouter.subscribe(appActions.router)
        subscribe && subscribe(appActions)
      }
    )
  }
}


export {
  withRouter,
  withSubscribe
}