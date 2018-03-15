import { createHashHistory } from 'history'
import { createRouter } from './modules/router'

export const history = window.$history = createHashHistory({ hashType: 'hashbang' })

const myRouter = createRouter(history)
export const subscription = ({ router }) => myRouter.subscribe(router)

export const state = { router: myRouter.state }

export const actions = { router: myRouter.actions }