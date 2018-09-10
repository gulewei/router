import { pathOf } from './path-of'

function routerFactory (history) {
  const state = {
    pathname: history.location.pathname,
    previous: null
  }

  const actions = {
    push: (path) => {
      history.push(path)
    },
    replace: (path) => {
      history.replace(path)
    },
    onChange: ({ location }) => ({ pathname: previous }) => {
      return {
        pathname: location.pathname,
        previous
      }
    }
  }

  const sub = (main) => {
    return history.listen((location) => {
      pathOf(main).onChange({ location })
    })
  }

  return {
    state,
    actions,
    sub
  }
}

export default routerFactory
