import { createHashHistory } from 'history'
import { routerFactory, sessionFactory } from '../src'

export const history = window.$history = createHashHistory({ hashType: 'hashbang' })

export const factories = [
  routerFactory(history),
  sessionFactory(history)
]
