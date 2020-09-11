let Koa = require('koa')
let Router = require('koa-router')
let router = new Router()
let path = require('path')
let app = new Koa()
let fs = require('fs')
let DbHelper = require('./db')
let mongo = new DbHelper()
let { promisify } = require('util')
let url = require('url')
let readFile = promisify(fs.readFile)
router.get('/', async (ctx, next) => {
  let data = await readFile(path.resolve(__dirname, './index.html'))
  ctx.type = 'text/html;charset=utf-8'
  ctx.body = data.toString()
})

router.get('/api/list', async (ctx, next) => {
  let { page, category, keyword } = url.parse(ctx.request.url, true).query
  let col = mongo.col('fruits')
  let total = await col.find().count()

  //跳过前五*n条
  let fruits = await col
    .find()
    .skip((page - 1) * 10)
    .limit(10)
    .toArray()

  ctx.body = {
    ok: 1,
    data: {
      fruits,
      pagination: {
        total,
        page,
      },
    },
  }
})

router.get('/api/category', async (ctx) => {
  let data = await mongo.col('fruits').distinct('category')
  ctx.body = { data }
})
app.use(router.routes())
app.listen(3000, () => {
  console.log('listen 3000')
})
