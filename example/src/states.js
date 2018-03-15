import { createHashHistory } from 'history'
import { pageState, pageActions } from './pages/Page'

const historyConfig = {
  hashType: 'hashbang',
  // basename: '/app'
}

export const history = window.$history = createHashHistory(historyConfig)

export const state = { page: pageState }

export const actions = { page: pageActions }
