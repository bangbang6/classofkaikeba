/**
 * 启动子进程执行命令 y与主进程同步进行
 * @param  {...any} args 命令的名称
 * 返回promise对象
 */
module.exports = async function mySpawn(...args) {
  let { spawn } = require('child_process')
  return new Promise((resolve) => {
    let proc = spawn(...args) // 启动子进程执行命令
    proc.stdout.pipe(process.stdout) // 子进程成功的信息流程主进程的正确输出信息
    proc.stderr.pipe(process.stderr) // 子进程成功的信息流程主进程的错误输出信息
    proc.on('close', () => {
      resolve()
    })
  })
}
