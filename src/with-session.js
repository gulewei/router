import init from './path-of'
import routerFactory from './router-factory'
import sessionFactory from './session-factory'

const NAME = 'router'

function withSession (app, { name = NAME, history }) {
  return function appWraper (state, actions, view, root) {
    init(name)

    const router = routerFactory(history)
    const session = sessionFactory(history)

    state[name] = { ...router.state, ...session.state }
    actions[name] = { ...router.actions, ...session.actions }

    const main = app(state, actions, view, root)

    router.subscribe(main)
    session.subscribe(main)

    return main
  }
}

export default withSession
