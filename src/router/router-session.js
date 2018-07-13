import { setGlobalContext } from '../context'

const MySession = {
  key: '_hoa_router__session_urls_',
  write (urls) {
    sessionStorage.setItem(MySession.key, JSON.stringify(urls))
  },
  read () {
    return JSON.parse(sessionStorage.getItem(MySession.key)) || []
  }
}

function createRouterWithSession (history, moduleName = 'location') {
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

export { createRouterWithSession }