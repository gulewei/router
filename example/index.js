import './style.css'
import { app } from 'hyperapp'
import { factories } from './router'
import { withRouter } from '../src'
import App from './App/App'

const config = {
  moduleName: 'my',
  unSubName: 'destroyRouter',
  factories
}

withRouter(app, config)({}, {}, App, document.body)
