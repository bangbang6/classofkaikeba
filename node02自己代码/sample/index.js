let Koa = require('koa')

let app = new Koa()
//!切面编程
app.use(async (ctx, next) => {
  let date1 = Date.now()

  await next()

  let date2 = Date.now()

  console.log(`请求事件 ${parseInt(date2 - date1)}ms`)
})
app.use((ctx, next) => {
  ctx.body = 'hello koa'
})

app.listen(3000, () => {
  console.log('listen at 3000')
})
