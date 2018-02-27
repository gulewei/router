import { router } from '../router/router'

function withSubscribe (app) {
  return function createAppWithSubscription (state, actions, view, rootEl, subscribe) {
    var appActions = app(state, actions, view, rootEl)
    subscribe && subscribe(appActions)
    return appActions
  }
}

function withRouter (app, history) {
  return function createAppWithRouter (state, actions, view, rootEl, subscribe) {
    var router = router(history)
    var wraperState = { ...state, router: router.state }
    var wraperActions = { ...actions, router: router.actions }

    return withSubscribe(app)(
      wraperState,
      wraperActions,
      view,
      rootEl,
      appActions => {
        router.subscribe(appActions.router)
        subscribe && subscribe(appActions)
      }
    )
  }
}


export {
  withRouter,
  withSubscribe
}