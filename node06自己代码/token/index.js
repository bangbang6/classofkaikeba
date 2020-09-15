const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const jwt = require('jsonwebtoken') //生成token
const jwtAuth = require('koa-jwt') //验证token的中间件
const cors = require('koa2-cors')

const secret = "it's a secret"
app.use(bodyParser())
app.use(static(__dirname + '/'))
//配置session的中间件
app.use(
  cors({
    origin: function (ctx) {
      //设置允许来自指定域名请求

      return '*' //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
  })
)
router.post('/login-token', async (ctx) => {
  const { body } = ctx.request
  //登录逻辑，略
  //设置session
  const userinfo = body.username
  ctx.body = {
    message: '登录成功',
    user: userinfo,
    // 生成 token 返回给客户端
    token: jwt.sign(
      {
        data: userinfo,
        // 设置 token 过期时间，一小时后，秒为单位
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      secret
    ),
  }
})
//token第三部分由header (base64后的) payload (base64后的)secret 三部分签名而成
router.get(
  '/getUser-token',
  jwtAuth({
    secret,
  }),
  async (ctx) => {
    // 验证通过，state.user
    console.log(ctx.state.user)

    //获取session
    ctx.body = {
      message: '获取数据成功',
      //jwt token 把payload数据放到ctx.state上啦
      userinfo: ctx.state.user.data,
    }
  }
)

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)
