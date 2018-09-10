import './style.css'
import { app } from 'hyperapp'
import { history } from './store'
import { withSession } from '../src'
import App from './App/App'

const config = {
  history,
  name: 'my',
  sessionKey: '_my_session_key_'
}

withSession(app, config)({}, {}, App, document.body)
