export as namespace HoaRouter

import { History } from 'history'

export function withRouter (
  app: Function, 
  name: string, 
  config: FactoryOptions
): (state, actions, view: Function, el: HTMLElement) => Object

export function initPathFn (pathFn: PathFn): void

export function routerFactory (config: FactoryOptions): {
  state: RouterState,
  actions: RouterActions,
  subscribe: (actions: Object) => Object
}

export const Switch: (props: Object, children: Function[]) => JSX.Element

export const Route: (props: RouteProps) => JSX.Element

export const Redirect: (props: { to: string }) => JSX.Element

export const Link: (props: { to: string }, children: any[]) => JSX.Element


type PathFn = (state: Object) => any

export interface FactoryOptions {
  pathFn: PathFn,
  history: History,
  state?: RouterState,
  beforeChange?: RouterChangeHook,
  afterChange?: RouterChangeHook
}

export enum EnumDirection {
  backward = 0,
  forward = 1,
  none = 2,
}

export const enumDirection: {
  backward: 0
  forward: 1
  none: 2
}

export interface RouterState {
  pathname: string
  previous: string
  direction: EnumDirection
  sessions: string[]
}

export interface RouterActions {
  push: (url: string) => void
  replace: (url: string) => void
  onChange: () => void
}

export interface RouterChangeHook {
  (actions: Object, pathFn: PathFn, history: History): void | true
}

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


