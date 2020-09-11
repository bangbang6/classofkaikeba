let conf = require('./conf')

let { EventEmitter } = require('events')

let { MongoClient } = require('mongodb')

//帮助更快的从数据库读取
class DbHelper {
  constructor() {
    this.emmiter = new EventEmitter()
    this.client = new MongoClient(conf.url, { useNewUrlParser: true }) //url指定db可以识别
    this.client.connect((err) => {
      if (err) throw err
      console.log('connect right')

      this.emmiter.emit('connect')
    })
  }
  /**
   * 返回数据库某个集合
   * @param {*} colname 集合名
   * @param {*} dbname 数据库名
   */
  col(colname, dbname = conf.dbName) {
    return this.client.db(dbname).collection(colname)
  }
  /**
   * 订阅事件
   * @param {*} event 事件名
   * @param {*} cb 执行的回调
   */
  once(event, cb) {
    this.emmiter.once(event, cb)
  }
}

module.exports = DbHelper
