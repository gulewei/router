export as namespace HoaRouter

import { History, Location, Action } from 'history'

// === init ===


export function init (name?: string): void
export function pathOf (s: Object): any


// === hoa ===


export function withRouter (
  app: Function,
  config: HoaConfig
): (state, actions, view: Function, el: HTMLElement) => Object

export function withSession (
  app: Function,
  config: HoaConfig
): (state, actions, view: Function, el: HTMLElement) => Object

type HoaConfig = {
  history: History,
  name?: string,
  sessionKey?: string
}


// === factory ===


export function routerFactory (history: History): {
  state: RouterState,
  actions: RouterActions,
  subscribe: (main: Object) => () => void
}

export interface RouterState {
  pathname: string
  previous: string
}

export interface RouterActions {
  push: (url: string) => void
  replace: (url: string) => void
  onChange: (data: { location: Location, action: Action }) => RouterState
}

export function sessionFactory (history: History, sessionKey?: string): {
  state: { stack: Location[] },
  actions: {
    onSessionChange: (data: { location: Location, action: Action }) => { stack: Location[] }
  },
  subscibe: (main: Object) => () => void
}


// === component ===


export const Switch: (props: Object, children: Function[]) => JSX.Element

export const Route: (props: RouteProps) => JSX.Element

export const Redirect: (props: { to: string }) => JSX.Element

export const Link: (props: { to: string }, children: any[]) => JSX.Element

export interface RouteProps {
  parent?: boolean,
  path: string,
  render: (param: { match: Match, state: RouterState }) => JSX.Element
}

export interface Match {
  isExact: boolean
  path: string
  url: string
  params: { [key: string]: string }
}
