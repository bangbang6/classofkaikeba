let fs = require('fs')
//!require就是把整个文件里面exports对象导入过来(参数是一个模块)或者把整个文件是个对象导入过来(这里面参数是路径) 没有export import 一律只能module.exports require
const { promisify } = require('util')
//!promisify把回调函数形式的函数转成promise形式方便async await 在node中只要是io处理或者需要等待的操作(语义去看)都是异步函数，且回调函数是最后一个参数且回调函数的参数一定是err在前
let myReadFile = promisify(fs.readFile)

;(async () => {
  let data = await myReadFile('./config.js')
  console.log('data2', data.toString())
})()
//1.错误优先
//!读取文件一定是读取二进制再通过toSting转成二进制 因为你不知道读取的是什么可能是文件图片等 所以node创建啦buffer对象 读取一律采用二进制读取
fs.readFile('./config.js', (err, data) => {
  console.log('data', data.toString())
})
