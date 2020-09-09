let Bang = require('./kkb.js')

let app = new Bang()
const Router = require('./router')
const router = new Router()

const static = require('./static')

router.get('/index', async (ctx) => {
  ctx.body += 'index page'
})
router.get('/post', async (ctx) => {
  ctx.body += 'post page'
})
router.get('/list', async (ctx) => {
  ctx.body += 'list page'
})
router.post('/index', async (ctx) => {
  ctx.body = 'post page'
})
// 路由实例输出父中间件 router.routes() app.use(router.routes());
app.use(async (ctx, next) => {
  ctx.body = '1'
  await next()
  ctx.body += '5'
})
app.use(async (ctx, next) => {
  ctx.body += '2'
  await next()
  ctx.body += '4'
})
app.use(async (ctx, next) => {
  ctx.body += '3'
  await next()
})
app.use(router.routes())

app.use(static('./public'))
app.listen(3000, () => {
  console.log('listen at 3000')
})
