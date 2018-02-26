import { withSubscription } from './hoa'
import { setGlobalContext } from './context'
import { createHashHistory } from 'history'

function initRouter (options) {
  const history = createHashHistory(options)

  setGlobalContext({ history })

  return {
    state: {
      urls: [history.location.pathname],
      currentIndex: 0
    },
    actions: {
      processPatchList: ({ url, actionType }) => (state) => {
        switch (actionType) {
          case 'PUSH':
            return {
              urls: state.urls.concat(url),
              currentIndex: state.currentIndex += 1
            }
          case 'REPLACE':
            return {
              urls: state.urls.slice(0, -1).concat(url),
              currentIndex: state.currentIndex
            }
          case 'POP':
            let popIndex = state.urls.indexOf(url)

            if (popIndex < 0) {
              return {
                urls: [url].concat(state.urls),
                currentIndex: 0
              }
            }

            return {
              urls: state.urls,
              currentIndex: popIndex
            }
          default:
            return state
        }
      },
      push: history.push,
      replace: history.replace,
      go: history.go,
      goBack: history.goBack,
      goForward: history.goForward
    },
    /** @param {AppActions} appActions */
    subscribe: appActions => history.listen(
      (location, actionType) => {
        console.log('listening: ', location, actionType, window.$state.router)
        appActions.processPatchList({ url: location.pathname, actionType })
      }
    ),
    history
  }
}

function withRouter (app, options) {
  return function createAppWithRouter (state, actions, view, rootEl, subscribe) {
    var router = initRouter(options)

    var _AppActions = withSubscription(app)({
      state: { ...state, router: router.state },
      actions: { ...actions, router: router.actions },
      view,
      rootEl,
      subscriptions: appActions => {
        router.subscribe(appActions.router)
        subscribe && subscribe(appActions)
      }
    })

    return _AppActions
  }
}

export { initRouter, withRouter }
