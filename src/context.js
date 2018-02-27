var globalContext = {
  history: {}
}

function getGlobalContext () {
  return globalContext
}

function setGlobalContext (context) {
  globalContext.history = context.history
  return globalContext
}

export { getGlobalContext, setGlobalContext }