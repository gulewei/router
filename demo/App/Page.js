import { h } from 'hyperapp'
import Page from '@gulw/components/lib/page'
import '@gulw/components/lib/page/style'
import Transition from '@gulw/components/lib/transition'
import { pathOf } from '../../src'

const cls = {
  // none
  none: {
    enter: 'not-animated',
    enterActive: 'not-animated',
    exit: 'not-animated',
    exitActive: 'not-animated'
  },
  // forward
  forward: {
    enter: 'page-on-right',
    enterActive: 'page-from-right-to-center',
    exit: 'page-on-center',
    exitActive: 'page-from-center-to-left'
  },
  // backward
  backward: {
    enter: 'page-on-left',
    enterActive: 'page-from-left-to-center',
    exit: 'page-on-center',
    exitActive: 'page-from-center-to-right'
  }
}

const runEnter = (el) => (direction) => {
  Transition.runEnter(el, cls[direction].enterActive, cls[direction].enter)
}

const runExit = (el, done) => (direction) => {
  Transition.runExit(el, cls[direction].exitActive, cls[direction].exit, done)
}

const _Page = ({ key }, children) => (_, actions) => {
  return (
    <Page
      key={key}
      class={`page-${key}`}
      oncreate={el => {
        pathOf(actions).onPageEnter(runEnter(el))
      }}
      onremove={(el, done) => {
        pathOf(actions).onPageExit(runExit(el, done))
      }}
    >
      <div class="page-inner">
        {children}
      </div>
    </Page>
  )
}

export default _Page
