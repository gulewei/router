import { createHashHistory } from 'history'

export const history = window.$history = createHashHistory({ hashType: 'hashbang' })
