## A Hyperapp Router

## Quick Start

```js
import { app, h } from 'hyperapp'
import { createHashHistory } from 'history'
import { withRouter } from 'hyperapp-hoa-router'
import App from './components/App'

const history = createHashHistory()

const config = {
  history,
  name: 'router'
}

withRouter(app, config)({}, {}, App, document.body)
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
