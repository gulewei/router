import init from './path-of'

/**
 * @param {{state: Object, actions: Object, subscribe: () => Function}[]} factories
 */
function combineFactories (factories) {
  return factories.reduce(
    ({ state: prevState, actions: prevActions, subscribes }, { state, actions, subscribe }) => {
      return {
        state: { ...prevState, ...state },
        actions: { ...prevActions, ...actions },
        subscribes: subscribes.concat(subscribe)
      }
    },
    { state: {}, actions: {}, subscribes: [] }
  )
}

const NAME = 'router'

function withRouter (app, { moduleName = NAME, unSubName = 'unSubAll', factories = [] }) {
  return function appWraper (state, actions, view, root) {
    init(moduleName)

    const factory = combineFactories(factories)
    state[moduleName] = factory.state
    actions[moduleName] = factory.actions

    const main = app(state, actions, view, root)
    const unSubs = factory.subscribes.map(sub => sub(main))

    main[unSubName] = () => unSubs.map(unSub => unSub())

    return main
  }
}

export default withRouter
