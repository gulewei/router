import { pathOf } from './path-of'

const SESSION_KEY = '_hoa_router_session'
const store = window.sessionStorage
const getSession = (key) => JSON.parse(store.getItem(key))
const setSession = (key, val) => store.setItem(key, JSON.stringify(val))

function sessionFactory (history, sessionKey = SESSION_KEY) {
  return {
    state: {
      stack: getSession(sessionKey) || [history.location]
    },
    actions: {
      onSessionChange: ({ location, action }) => ({ stack }) => {
        let nextStack
        switch (action) {
          case 'PUSH':
            nextStack = stack.concat(location)
            break
          case 'REPLACE':
            nextStack = stack.slice(0, -1).concat(location)
            break
          case 'POP':
          default:
            nextStack = stack
        }
        setSession(sessionKey, nextStack)
        return { stack: nextStack }
      }
    },
    subscribe: (main) => {
      return history.listen((location, action) => {
        pathOf(main).onSessionChange({ location, action })
      })
    }
  }
}

export default sessionFactory
