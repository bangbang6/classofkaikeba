let Koa = require('koa')

let session = require('koa-session')

let app = new Koa()

app.keys = ['some serdaf']
let redisStore = require('koa-redis')
let redis = require('redis')

let redisClient = redis.createClient(6379, 'localhost')
let wrapper = require('co-redis')
let client = wrapper(redisClient)
let SESS_CONFIG = {
  key: 'kkb:sess', //相当于‘sid’
  maxAge: 86400000,
  httpOnly: true, //前端取不到cookie document.cookie取不到
  signed: false, //防止sessionid篡改
  store: redisStore({ client }), //设置session存储方式
}

app.use(session(SESS_CONFIG, app))
app.use(async (ctx, next) => {
  let keys = await client.keys('*')
  keys.forEach(async (v) => {
    console.log(await client.get(v))
  })
  await next()
})
app.use((ctx) => {
  if (ctx.path === '/favicon.ico') {
    ctx.body = ''
    return
  }
  //读取
  let n = ctx.session.count || 0
  //设置
  ctx.session.count = ++n
  ctx.body = `第${n}次访问`
})
app.listen(3000, () => {
  console.log('listen at 3000')
})
