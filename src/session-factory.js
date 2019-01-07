import { pathOf } from './path-of'
import { nextSession, delta } from './next-session';

const SESSION_KEY = '_hoa_router_session'
const store = window.sessionStorage

export const DIRECTION = {
    forward: 'forward',
    backward: 'backward',
    none: 'none'
}


function sessionFactory(history, sessionKey = SESSION_KEY) {
    const getSession = () => JSON.parse(store.getItem(sessionKey)) || void 0
    const setSession = (val) => store.setItem(sessionKey, JSON.stringify(val))

    const state = {
        session: nextSession(history.location.pathname, 'POP', getSession()),
        direction: DIRECTION.none
    }
    setSession(state.session)

    return {
        state,
        actions: {
            onSessionChange: ({ location: { pathname }, action }) => ({ session }) => {
                const next = nextSession(pathname, action, session)
                setSession(next)

                let direction
                switch (next[1] - session[1]) {
                    case 0:
                        direction = DIRECTION.none
                        break
                    case Math.abs(next[1] - session[1]):
                        direction = DIRECTION.forward
                        break
                    default:
                        direction = DIRECTION.backward
                        break
                }

                return { session: next, direction }
            },
            popTo: (url) => ({ session }) => {
                const _delta = delta(session, url)
                console.log('delta', _delta)
                history.go(delta(session, url))
            }
        },
        sub: (main) => {
            return history.listen((location, action) => {
                pathOf(main).onSessionChange({ location, action })
            })
        }
    }
}

export default sessionFactory
