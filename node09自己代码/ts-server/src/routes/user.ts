import * as Koa from 'koa'
import { get, post } from '../framework/route-decorates'
const users = [{ name: 'tom' }]

/**
 * 类装饰器
 * @param target 类名
 */
let middlewareDec = (middlewares: Koa.Context[]) => (target) => {
  target.prototype.middlewares = middlewares
}
@middlewareDec([
  async (ctx, next) => {
    console.log('User middleware')
    if (ctx.header.token) await next()
    else throw '没token'
  },
])
export default class User {
  //完成自动注册路由的装饰器
  @get('/users', {
    middlewares: [
      async (ctx, next) => {
        console.log(1)

        await next()
        console.log(2)
      },
    ],
  })
  public async list(ctx: Koa.Context, next) {
    ctx.body = {
      data: users,
    }
    await next()
  }
  @post('/users')
  public add(ctx: Koa.Context) {
    users.push(ctx.request.body)
    ctx.body = { pk: 1 }
  }
}
