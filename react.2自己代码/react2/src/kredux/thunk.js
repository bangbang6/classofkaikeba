export function thunk({ getStore }) {
  return (next) => (action) => {
    //!如果式异步函数就在本插件执行执行action的处理
    if (typeof action === 'function') {
      return action(next, getStore)
    }
    //!不是异步函数就往下找别的插件 每个函数的返回值都是类似dispatch的函数 接受action然后有自己对action的处理 funciton(action){xxx自己的处理}
    return next(action)
  }
}

//return funcs.reduce((a, b) => (...args) => a(b(...args)))
