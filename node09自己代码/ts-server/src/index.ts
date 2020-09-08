import * as Koa from 'koa'
import * as bodify from 'koa-body'
import * as serve from 'koa-static'
import * as timing from 'koa-xtime'
const Router = require('koa-router')
const app = new Koa()
import { loader } from './framework/route-decorates'
let path = require('path')
app.use(timing())
app.use(serve(`${__dirname}/public`))

app.use(
  bodify({
    multipart: true,
    // 使⽤⾮严格模式，解析 delete 请求的请求体
    strict: false,
  })
)
let router = loader(path.resolve(__dirname, './routes'))
app.use(router.routes())

app.listen(3000, () => {
  console.log('服务器启动成功')
})
