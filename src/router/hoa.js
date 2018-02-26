function noop () { }

function withSubscription (app) {
  return function createAppWithSubscription (
    { state, actions, view, subscriptions = noop, rootEl }
  ) {
    var appActions = app(state, actions, view, rootEl)
    subscriptions(appActions)
    return appActions
  }
}

export {
  withSubscription
}