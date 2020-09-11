//将routes下面route的自动注册

let fs = require('fs')
let path = require('path')

let Router = require('koa-router')

function load(dir, cb) {
  let url = path.resolve(__dirname, dir)
  let files = fs.readdirSync(url)

  files.forEach((filename) => {
    filename = filename.replace('.js', '')

    let file = require(url + '/' + filename)
    cb(filename, file)
  })
}

/**
 * 初始化router 返回定义好规则的router便于存放在app中
 */
function initRouter(kkb) {
  let router = new Router()

  load('routes', (filename, file) => {
    //前缀计算
    file = typeof file === 'function' ? file(kkb) : file
    let prefix = filename === 'index' ? '' : `/${filename}`
    Object.keys(file).forEach((key) => {
      let [method, path] = key.split(' ')
      router[method](prefix + path, async (ctx) => {
        kkb.ctx = ctx
        console.log('func', file[key])
        await file[key](kkb)
      })
    })
  })
  return router
}
/**
 * 初始化controller把ctrl挂载在app上
 */
function initController() {
  let controllers = {}

  load('controller', (filename, file) => {
    //[home] = {index:moddware,detail:middleware}
    controllers[filename] = file
  })
  return controllers
}

function initService(kkb) {
  let service = {}
  load('service', (filename, file) => {
    service[filename] = file(kkb)
  })

  return service
}

let Sequelize = require('sequelize')

function loadConfig(kkb) {
  load('config', (filename, config) => {
    if (config.db) {
      //链接数据库
      kkb.$db = new Sequelize(config.db)

      //加载模型
      kkb.$model = {}

      load('model', (filename, { schema, options }) => {
        kkb.$model[filename] = kkb.$db.define(filename, schema, options) // 变成可以直接操作数据库对象的表对象
      })
      kkb.$db.sync() //同步建表
    }

    if (config.middleware) {
      config.middleware.forEach((mid) => {
        let midPath = path.resolve(__dirname, 'middleware', mid)

        kkb.$app.use(require(midPath))
      })
    }
  })
}

let schedule = require('node-schedule')

function initSchedule() {
  load('schedule', (filename, scheduleConfig) => {
    schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler)
  })
}
module.exports = {
  initRouter,
  initController,
  initService,
  loadConfig,
  initSchedule,
}
