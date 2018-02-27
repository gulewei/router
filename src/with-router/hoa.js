import { createRouter } from '../router/router'
import { setGlobalContext } from '../context'

function withSubscribe (app) {
  return function createAppWithSubscription (state, actions, view, rootEl, subscribe) {
    let appActions = app(state, actions, view, rootEl)
    subscribe && subscribe(appActions)
    return appActions
  }
}

function withRouter (app, history) {
  setGlobalContext({ history })

  return function createAppWithRouter (state, actions, view, rootEl, subscribe) {
    let router = createRouter(history)
    // let wraperState = { ...state, router: router.state }
    // let wraperActions = { ...actions, router: router.actions }
    state.router = router.state
    actions.router = router.actions

    return withSubscribe(app)(
      state,
      actions,
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