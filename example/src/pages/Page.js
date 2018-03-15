import { h } from 'hyperapp'

function handleAnimationEnd (el, setAnimation, hook) {
  const handler = () => {
    setAnimation(ANIMATIONS.none)
    el.removeEventListener('animationend', handler)
    hook && hook()
  }
  el.addEventListener('animationend', handler)
}

function onCreate (propOnCreate, setAnimation) {
  return el => {
    handleAnimationEnd(el, setAnimation)
    setAnimation(ANIMATIONS.enter)
    setTimeout(() => {
      setAnimation(ANIMATIONS.enterTo)
    }, 0)
    propOnCreate && propOnCreate(el)
  }
}

function onRemove (propOnRemove, setAnimation) {
  return (el, done) => {
    handleAnimationEnd(el, setAnimation, done)
    setAnimation(ANIMATIONS.leave)
    requestAnimationFrame(() => setAnimation(ANIMATIONS.leaveTo))
    propOnRemove && propOnRemove(el, done)
  }
}

function getAnimationCls (name, state) {
  switch (state) {
    case ANIMATIONS.enter:
      return `${name}-${ANIMATIONS.enter} ${name}-${ANIMATIONS.enter}-active`
    case ANIMATIONS.enterTo:
      return `${name}-${ANIMATIONS.enterTo} ${name}-${ANIMATIONS.enter}-active`
    case ANIMATIONS.leave:
      return `${name}-${ANIMATIONS.leave} ${name}-${ANIMATIONS.leave}-active`
    case ANIMATIONS.leaveTo:
      return `${name}-${ANIMATIONS.leaveTo} ${name}-${ANIMATIONS.leave}-active`
    case ANIMATIONS.none:
    default:
      return ''
  }
}

const Page = (props, children) => {
  const { animationState, animationName } = props
  const cls = getAnimationCls(animationName, animationState)

  console.log({ cls, animationState })
  return (
    <div
      key={props.key}
      className={`page-container ${props.class} ${cls}`}
      oncreate={onCreate(props.oncreate, props.setAnimation)}
      onRemove={onRemove(props.onremove, props.setAnimation)}
    >{children}</div>
  )
}

const ANIMATIONS = {
  enter: 'enter',
  enterTo: 'enter-to',
  leave: 'leave',
  leaveTo: 'leave-to',
  none: 'none'
}

const pageState = {
  animation: ANIMATIONS.none
}

const pageActions = {
  setAnimation (animation) {
    console.log({ animation })
    return { animation }
  }
}

export default function ConnectPage (props, children) {
  props.animationState = window.$state.page.animation
  props.animationName = 'animation-page'
  props.setAnimation = window.$actions.page.setAnimation
  props.class = props.key
  return Page(props, children)
}

export {
  pageState,
  pageActions
}
