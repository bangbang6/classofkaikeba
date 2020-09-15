module.exports = (options, app) => {
  //!app就是整个项目的对象 其他的对象都存储在这个对象里面
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      //错误应答 没有错就直接next
      //抛出错误事件 后端也要处理错误
      console.log(111)
      app.emit('error', err, this)

      let status = err.status || 500

      let error =
        status === 500 && app.config.env === 'prod'
          ? 'Internal server'
          : err.message

      ctx.body = {
        code: status,
        error: err,
      }
      //用户传入接口参数的参数
      if (status === 422) {
        ctx.body.detail = err.errors
      }
      ctx.body.status = 200
    }
  }
}
