import * as Koa from 'koa'
import * as glob from 'glob'
import * as KoaRouter from 'koa-router'
const router = new KoaRouter()
///options?:{middlewares:Array<Koa.Context>}表示options里面有middleware这个字段且是数组
//!实现自动配置router的装饰器
export const createDecorate = (router: KoaRouter) => (
  method: 'get' | 'post' | 'put' | 'delete'
) => (path: string, options?: { middlewares: Koa.Context[] }) => (
  target,
  property,
  descriptor
) => {
  const middlewares = []

  if (options && options.middlewares) {
    middlewares.push(...options.middlewares)
  }
  middlewares.push(descriptor.value)
  //按序执行所有中间件
  //最后再加上这个 为什么不是不是写最后面 因为可能这个类有get post方法 简单的写后面 在get后还是添加进来了 却在post前面 所以我们get post是同步 让中间件异步去添加
  process.nextTick(() => {
    if (target.middlewares) {
      console.log(target.middlewares)

      middlewares.push(...target.middlewares)
      router[method](path, ...middlewares)
    }
  })
}
const method = createDecorate(router)
export const get = method('get')
export const post = method('post')
export let loader = (folder: string): KoaRouter => {
  const extname = '.{js,ts}'

  glob
    .sync(require('path').join(folder, `./**/*${extname}`))
    .forEach((file) => {
      require(file)
    })

  return router
}
