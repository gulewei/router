## A Hyperapp Router

## Quick Start

```js
import { app, h } from 'hyperapp'
import { createHashHistory } from 'history'
import { withRouter } from 'hyperapp-hoa-router'
import App from './components/App'

const history = createHashHistory()
const myRouter = createRouter(history)

const appActions = app(
  { router: myRouter.state }, 
  { router: myRouter.actions }, 
  view, 
  document.body
)
const unsubscribe = myRouter.subscrbe(appActions.router)
```

- **createRouter**: history => { state, actions, subscribe } 

  Initialize *state* and *actions* used in app, provider a *subscrbe* method linsten to location change

- **state**: { urls: string[], index: number }

  *urls* means the history stack, and *index* position of current url.

- **actions**: { modifyUrl, callHistoryMethod }

  - **modifyUrl**: (url: string) => state

    Modify state when location change, and trigger view update. 
  
  - **push**: (path: string) => void

    Change location by call *history.push*.

  - **replace**: (path: string) => void

  Change location by call *history.replace*.

  - **go**: (n: number) => void

  Change location by call *history.go* method.
  

## HOA Function

```js
import { app, h } from 'hyperapp'
import { createHashHistory } from 'history'
import { withRouter } from 'hyperapp-hoa-router'
import view from '@components/App'

const history = createHashHistory()
const anySubScriptions = appActions => { 
  // subscribe app actions
}

withRouter(app, history)(
  {}, 
  {}, 
  view, 
  document.body
  )
```

- **withRouter**: (app, history) => (state, actions, view, el) => appActions

  Automatically handle router for you

## Components

  Components are basically identify with [hyperapp/router](https://github.com/hyperapp/router) components

- **Route**

- **Switch**

- **Link**

- **Redirect**

## Dependencies Reference

[Hyperapp](https://github.com/hyperapp/hyperapp): 1 kB JavaScript framework for building web applications.

[History](https://github.com/ReactTraining/history): Easily manage session history anywhere JavaScript runs. Abstracts away the differences in various environments and provides a minimal API that lets you manage the history stack, navigate, confirm navigation, and persist state between sessions.
