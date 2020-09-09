//多线程调用app.js去请求3000
//!node就是为多线程而开的
const cluster = require('cluster')

let os = require('os')

let numCpus = os.cpus().length //线程数

let process = require('process')

let workers = {}
//s主进程 第一次调用的时候一定是主进程
if (cluster.isMaster) {
  //主进程
  for (var i = 0; i < numCpus; i++) {
    var worker = cluster.fork() //复制自身进程 但是复制的就不是主进程 走到工作进程去 复制的就是Node cluster.js这个进程 启动多个该进程去else里面逻辑执行启动服务器
    console.log('init pid', worker.process.pid)
    workers[worker.process.pid] = worker
  }
  //某个进程出错在这一次性监听
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}出错了`)

    delete workers[worker.process.pid]

    worker = cluster.fork()
    workers[worker.process.pid] = worker
  })
} else {
  //工作进程 启动很多个服务器监听3000 就算出错了也能保证用户访问不会错因为很多核
  let app = require('./app')
  app.listen(3000)
}
//主进程关闭时候关闭所有小弟
process.on('SIGTERM', () => {
  for (var pid in workers) {
    process.kill(pid)
  }
  process.exit()
})
//启动测试函数
require('./test')
