export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  let currentStore = 0
  let cbs = []
  function getState() {
    return currentStore
  }
  function dispatch({ type, payload }) {
    currentStore = reducer(currentStore, { type, payload })
    cbs.forEach((cb) => {
      cb.call(this)
    })
  }
  let subscribe = (cb) => {
    cbs.push(cb)
    return () => {
      cbs = []
    }
  }
  dispatch('xxxxx')
  return {
    getState,
    dispatch,
    subscribe,
  }
}

//暗号 毛里塔尼亚
