## A Hyperapp Router

## [Demo](https://venecy.github.io/router/demo/)

## Quick Start

```js
import { app } from 'hyperapp'
import { createHashHistory } from 'history'
import { withRouter, routerFactory } from 'hyperapp-hoa-router'
import App from './components/App'

const history = createHashHistory()

const config = {
  factories: [routerFactory(history)]
}

withRouter(app, config)({}, {}, App, document.body)
```

or

```js
import { app } from 'hyperapp'
import { createHashHistory } from 'history'
import { init, routerFactory } from 'hyperapp-hoa-router'
import App from './App'

init('router')
const router = routerFactory(createHashHistory())
const main = app(
  { router: router.state },
  { router: router.actions },
  App,
  document.body
)
router.sub(main)
```


## Components

  Components are basically identify with [hyperapp/router](https://github.com/hyperapp/router) components

- **Route**

- **Switch**

- **Link**

- **Redirect**


## Dependencies Reference

[Hyperapp](https://github.com/hyperapp/hyperapp): 1 kB JavaScript framework for building web applications.

[History](https://github.com/ReactTraining/history): Easily manage session history anywhere JavaScript runs. Abstracts away the differences in various environments and provides a minimal API that lets you manage the history stack, navigate, confirm navigation, and persist state between sessions.
