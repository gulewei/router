import { createHashHistory } from 'history'
import { routerFactory, sessionFactory } from '../src'

export const history = window.$history = createHashHistory({ hashType: 'hashbang' })

window.$history = history

const session = sessionFactory(history)

session.actions.onPageEnter = (runEnter) => ({ direction }) => {
  runEnter(direction)
}

session.actions.onPageExit = (runExit) => ({ direction }) => {
  runExit(direction)
}

export const factories = [
  routerFactory(history),
  session
]
