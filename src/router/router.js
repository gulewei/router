function handleHistory ({ url, actionType }) {
  return state => {
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
  }
}

function router (history) {
  return {
    state: {
      urls: [history.location.pathname],
      currentIndex: 0
    },
    actions: {
      handleHistory
    },
    subscribe: appActions => history.listen(
      (location, actionType) => {
        appActions.handleHistory({ url: location.pathname, actionType })
      }
    )
  }
}

export { router }