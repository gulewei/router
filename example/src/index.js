import './style.css'
import { app } from "hyperapp"
import { state, actions, myRouter } from './store'
import App from './components/App'

const appActions = app(state, actions, App, document.body)
const unsubscribe = myRouter.subscribe(appActions.router)

export { unsubscribe }
