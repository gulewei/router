export as namespace HoaRouter

import { History, Location, Action } from 'history'
import { View } from 'hyperapp'

// === init ===


export function init (name?: string): void
export function pathOf (s: Object): any


// === hoa ===


export function withRouter (
  app: Function,
  config: HoaConfig
): (state, actions, view: Function, el: HTMLElement) => Object

type HoaConfig = {
  moduleName?: string,
  unSubName?: string,
  factories: Factory
}



// === factory ===


export interface Factory<State = Object, Actions = Object> {
  state: State,
  actions: Actions,
  subscribe: (main: Object) => () => void
}

export function routerFactory (history: History): Factory<RouterState, RouterActions>

export interface RouterState {
  pathname: string
  previous: string
}

export interface RouterActions {
  push: (url: string) => void
  replace: (url: string) => void
  onChange: (data: { location: Location, action: Action }) => RouterState
}

export function sessionFactory (history: History, sessionKey?: string): Factory<SessionState, SessionActions>

export interface SessionState {
  stack: Location[]
}

export interface SessionActions {
  onSessionChange: (data: { location: Location, action: Action }) => { stack: Location[] }
}


// === component ===


export const Switch: (props: Object, children: Function[]) => View<any, any>

export const Route: (props: RouteProps) => View<any, any>

export const Redirect: (props: { to: string }) => View<any, any>

export const Link: (props: { to: string }, children: any[]) => View<any, any>

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
