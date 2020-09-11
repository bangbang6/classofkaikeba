let koa = require('koa')

let {
  initRouter,
  initService,
  loadConfig,
  initSchedule,
} = require('./koa-loader')
let { initController } = require('./koa-loader')

module.exports = class Kkb {
  constructor(conf) {
    this.$app = new koa(conf)
    loadConfig(this)
    initSchedule()
    this.$service = initService(this)
    this.$ctrl = initController()

    this.$router = initRouter(this)

    this.$app.use(this.$router.routes())
  }

  start(port) {
    this.$app.listen(port, () => {
      console.log(`程序启动 at ${port}`)
    })
  }
}
