import { setGlobalContext } from '../context'

function createRouter (history) {
  setGlobalContext({ history })

  return {
    state: {
      urls: [history.location.pathname],
      index: 0
    },
    actions: {
      modifyUrl ({ newUrl, type }) {
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
      },
      callHistoryMethod ({ method, args }) {
        history[method](...args)
      }
    },
    subscribe: actions => history.listen(
      (location, type) => {
        actions.modifyUrl({ newUrl: location.pathname, type })
      }
    )
  }
}

export { createRouter }