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

function createRouterWithSession (history) {
  setGlobalContext({ history })

  return {
    state: {
      url: MySession.read()
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

export { createRouterWithSession }