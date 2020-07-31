export function combineReducers(reducers) {
  //暗号：毛里塔尼亚
  return function combination(state = {}, action) {
    let nextState = {}
    let hasChanged = false
    //遍历所有的reducers
    for (let key in reducers) {
      //key = 'firstreducer' state是全部的数据 里面也有key来分辨来自哪个reducers
      let reducer = reducers[key]
      nextState[key] = reducer(state[key], action)
      //判断state是否发生改变
      hasChanged = hasChanged || state[key] !== nextState[key]
    }

    hasChanged =
      hasChanged || Object.keys(nextState).length !== Object.keys(state).length
    return hasChanged ? nextState : state
  }
}
