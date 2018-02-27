## another router with hoa function for hyperapp

## provider a samilar api with react-router

```js

import { withRouter, Route, Switch, Link } from 'hyperapp-hoa-router'
import { app, h } from 'hyperapp'
import { createHashHistory } from 'history'

const history = createHashHistory()

withRouter(app, history)(state, actions, view, document.body)

```

## ref

[history](https://github.com/ReactTraining/history)
[hyperapp](https://github.com/hyperapp/hyperapp)