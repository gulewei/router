function modifyUrl ({ newUrl, type }) {
  return state => {
    switch (type) {
      case 'PUSH':
        return {
          urls: state.urls.concat(newUrl),
          index: state.index += 1
        }
      case 'REPLACE':
        return {
          urls: state.urls.slice(0, -1).concat(newUrl),
          index: state.index
        }
      case 'POP':
        let popIndex = state.urls.indexOf(newUrl)

        if (popIndex < 0) {
          return {
            urls: [newUrl].concat(state.urls),
            index: 0
          }
        }

        return {
          urls: state.urls,
          index: popIndex
        }
      default:
        return state
    }
  }
}

function createRouter (history) {
  return {
    state: {
      urls: [history.location.pathname],
      index: 0
    },
    actions: {
      modifyUrl,
      callHistoryMethod ({ method, args }) {
        history[method](...args)
      }
    },
    subscribe: appActions => history.listen(
      (location, type) => {
        appActions.modifyUrl({ url: location.pathname, type })
      }
    )
  }
}

export { createRouter }