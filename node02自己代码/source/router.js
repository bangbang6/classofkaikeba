/**
 * 函数中间件的依次执行
 * @param  {...any} funcs 函数数组 args是函数列表的参数
 * 返回的函数是个合成函数 调用合成函数将依次执行所有中间件 dispatch函数作用是执行所有的中间件并且返回promise对象支持async await
 */
let compose = (middlewares) => {
  return function (ctx) {
    return dispatch(0)

    function dispatch(i) {
      let fn = middlewares[i] //fn才是中间件
      if (!fn) return Promises.resolve()
      return Promise.resolve(
        fn(ctx, function next() {
          return dispatch(i + 1)
        })
      )
    }
  }
}

module.exports = class Router {
  constructor() {
    this.stack = []
  }
  register(method, path, ...middleware) {
    this.stack.push({ method, path, middleware })
  }
  get(path, ...middleware) {
    this.register('get', path, ...middleware)
  }
  post(path, ...middleware) {
    this.register('post', path, ...middleware)
  }
  /**
   *
   * 中间件 实现stack和当前路径对比 然后执行对应表中的中间件
   */
  routes() {
    let currentPath
    let method
    let middlewares
    return async (ctx, next) => {
      currentPath = ctx.url
      method = ctx.method
      for (let i = 0; i < this.stack.length; i++) {
        if (
          currentPath === this.stack[i].path &&
          method === this.stack[i].method
        ) {
          middlewares = this.stack[i].middleware
          break
        }
      }

      if (middlewares) {
        let eniger = compose(middlewares)
        await eniger(ctx)
      }
      console.log('------')
      await next()
    }
  }
}
