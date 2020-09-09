const http = require('http')
const request = require('./request')
const response = require('./response')
const context = require('./context')
module.exports = class Bang {
  callbacks = []
  listen(...args) {
    let server = http.createServer(async (req, res) => {
      let ctx = createContext(req, res)

      let enigner = compose(this.callbacks)
      //执行完所有中间件 ctx.body应该有东西
      await enigner(ctx)

      res.end(ctx.body)
    })

    server.listen(...args)
  }
  use(callback) {
    this.callbacks.push(callback)
  }
}

function createContext(req, res) {
  let ctx = Object.create(context)
  //绑定ctx和request response的关系
  ctx.request = Object.create(request)
  ctx.response = Object.create(response)

  //绑定request response和 req rea的关系

  ctx.req = ctx.request.req = req
  ctx.res = ctx.response.res = res
  return ctx
}
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
      if (!fn) return Promise.resolve()
      return Promise.resolve(
        fn(ctx, function next() {
          return dispatch(i + 1)
        })
      )
    }
  }
}
