import { setGlobalContext } from '../context'

function createRouter (history, moduleName = 'location') {
  setGlobalContext({ history })

  return {
    moduleName,
    state: {
      pathname: '',
      previous: ''
    },
    actions: {
      modifyUrl: (pathname) => (state) => { 
        return {
          pathname,
          previous: state.pathname
        }
      }
    },
    subscribe: actions => history.listen(
      (location) => {
        actions.modifyUrl(location.pathname)
      }
    )
  }
}

export { createRouter }