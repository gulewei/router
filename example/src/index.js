import './index.css'
import { app } from "hyperapp"
import { withRouter } from 'hyperapp-hoa-router'
import { history, state, actions } from './states'
import App from './App'

withRouter(app, history)(state, actions, App, document.body)
