export function createStore(reducer) {
  let currentStore
  let cbs = []
  function getStore() {
    return currentStore
  }
  function dispatch(type, payload) {
    currentStore = reducer(currentStore, { type, payload })
    cbs.forEach((cb) => {
      cb.call(this)
    })
  }
  let subscribe = (cb) => {
    cbs.push(cb)
  }
  return {
    getStore,
    dispatch,
    subscribe,
  }
}
