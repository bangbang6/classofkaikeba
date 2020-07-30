export function applyMiddleware(...middlewares) {
  //返回enhancer两阶函数 enhancer这个函数接受createStore函数和reducer函数返回store对象即
  /*return {
    getStore,
    dispatch,
    subscribe,
  }类型对象*/
  return (createStore) => (reducer) => {
    let store = createStore(reducer)
    let middlewareApi = {
      getStore: store.getStore,
      dispatch: () => store.dispatch,
    }

    let middwareChains = middlewares.map((middleware) =>
      middleware(middlewareApi)
    )

    let dispatch = compose(...middwareChains)(store.dispatch) //最好还得返回一个函数
    return {
      ...store,
      dispatch,
    }
  }
}
function compose(...funcs) {
  if (funcs.length === 0) return (args) => args
  else if (funcs.length === 1) return funcs[0]
  else {
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
  }
}
