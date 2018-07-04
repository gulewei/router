import { setGlobalContext } from '../context'

function createRouter (history) {
  setGlobalContext({ history })

  return {
    state: {
      url: ''
    },
    actions: {
      modifyUrl: (url) => ({ url }),
      push: (path) => history.push(path),
      replace: (path) => history.replace(path),
      go: (n) => history.go(n)
    },
    subscribe: actions => history.listen(
      (location) => {
        actions.modifyUrl(location.pathname)
      }
    )
  }
}

export { createRouter }