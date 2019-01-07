import createHashHistory from 'history/createHashHistory'
import { routerFactory } from '../src'
import sessionFactory from '../src/session-factory'

export const history = createHashHistory({ hashType: 'hashbang' })
window.$history = history

const animateFactory = () => {
  return {
    state: {},
    actions: {
      onPageEnter: (runEnter) => ({ direction }) => {
        runEnter(direction)
      },
      onPageExit: (runExit) => ({ direction }) => {
        runExit(direction)
      }
    },
    sub: () => () => { }
  }
}

export const factories = [
  routerFactory(history),
  sessionFactory(history),
  animateFactory()
]
