import init from './path-of'
import routerFactory from './router-factory'

const NAME = 'router'

function withRouter (app, { name = NAME, history }) {
  return function appWraper (state, actions, view, root) {
    init(name)

    const router = routerFactory(history)

    state[name] = router.state
    actions[name] = router.actions

    const main = app(state, actions, view, root)

    router.subscribe(main)

    return main
  }
}

export default withRouter
