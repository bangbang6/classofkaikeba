const Koa = require('koa')
const router = require('koa-router')()
const session = require('koa-session')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const app = new Koa()

//配置session的中间件
app.use(
  cors({
    origin: function (ctx) {
      //设置允许来自指定域名请求

      return '*'
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
  })
)

let SESS_CONFIG = {
  key: 'kkb:sess', //相当于‘sid’
  maxAge: 86400000,
  httpOnly: true, //前端取不到cookie document.cookie取不到
  signed: false, //防止sessionid篡改
}
app.keys = ['some secret']

app.use(static(__dirname + '/'))
app.use(bodyParser())
app.use(session(SESS_CONFIG, app)) //没填配置项就是默认配置 为什么传入app是因为要用app.keys去生成摘要

app.use((ctx, next) => {
  if (ctx.url.indexOf('login') > -1) {
    next()
  } else {
    console.log('session', ctx.session.userinfo)
    if (!ctx.session.userinfo) {
      ctx.body = {
        message: '登录失败',
      }
    } else {
      next()
    }
  }
})

router.post('/login', async (ctx) => {
  const { body } = ctx.request
  console.log('body', body)
  //设置session
  ctx.session.userinfo = body.username
  ctx.body = {
    message: '登录成功',
  }
})
router.post('/logout', async (ctx) => {
  //设置session
  delete ctx.session.userinfo
  ctx.body = {
    message: '登出系统',
  }
})
router.get('/getUser', async (ctx) => {
  ctx.body = {
    message: '获取数据成功',
    userinfo: ctx.session.userinfo,
  }
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)
