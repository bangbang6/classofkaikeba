let fs = require('fs')

let path = require('path')

let mongoose = require('mongoose')
/**
 * 将dir下面的文件全部读取出来 取执行cb回调
 * @param {*} dir 文件夹路径
 * @param {*} cb 回调函数
 */
async function loader(dir, cb) {
  let url = path.resolve(__dirname, dir)

  let files = await fs.readdirSync(url)

  files.forEach((filename) => {
    filename = filename.replace('.js', '')

    let file = require(url + '/' + filename)
    //user,user.js具体导出内容
    cb(filename, file)
  })
}

/**
 * 链接上数据库并且配置好koa的router
 * @param {*} config 链接数据库的配置
 */
let loadModel = (config) => (app) => {
  //链接数据库
  mongoose.connect(config.db.url, config.db.options)
  //获取链接的变量
  let conn = mongoose.connection
  app.$model = {}
  loader('../model', (filename, { schema }) => {
    app.$model[filename] = mongoose.model(filename, schema)
    console.log(app.$model)
  })
}

module.exports = { loadModel }
