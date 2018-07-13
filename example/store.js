import { createHashHistory } from 'history'
import { createRouter } from '../src'

export const history = window.$history = createHashHistory({ hashType: 'hashbang' })

export const myRouter = createRouter(history)

export const state = { router: myRouter.state }

export const actions = { router: myRouter.actions }