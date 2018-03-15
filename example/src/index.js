import './style.css'
import { app } from "hyperapp"
import { withSubscribe } from './modules/router'
import { state, actions, subscription } from './store'
import App from './components/App'

withSubscribe(app)(state, actions, App, document.body, subscription)
