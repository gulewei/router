import { pathOf } from './path-of'
import { withStorage, delta } from './next-session';

const SESSION_KEY = '_hoa_router_session'

export const DIRECTION = {
    forward: 'forward',
    backward: 'backward',
    none: 'none'
}


function sessionFactory(history, sessionKey = SESSION_KEY) {
    const [initial, udpate] = withStorage(sessionKey, history.location.pathname)

    const state = {
        session: initial,
        direction: DIRECTION.none
    }

    return {
        state,
        actions: {
            onSessionChange: ({ location: { pathname }, action }) => ({ session }) => {
                const next = udpate(pathname, action, session)

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
