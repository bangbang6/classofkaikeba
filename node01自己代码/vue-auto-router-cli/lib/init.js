const { promisify } = require('util')

const figlet = promisify(require('figlet')) //把文字变大

const clear = require('clear')
const chalk = require('chalk') //修饰日志的颜色等
const log = (content) => {
  console.log(chalk.green(content))
}
const { clone } = require('./download')
let spawn = require('./spawn')
let open = require('open')
module.exports = async (name) => {
  clear()
  let data = await figlet('Welcome Bang')
  log(data)
  log(`🚀创建项目：${name}`)
  await clone('github:su37josephxia/vue-template', name)
  console.log('安装依赖...')
  await spawn(process.platform === 'win32' ? 'cnpm.cmd' : 'cnpm', ['install'], {
    cwd: `./${name}`,
  })
  open(`http://localhost:8080`)
  await spawn(
    process.platform === 'win32' ? 'cnpm.cmd' : 'cnpm',
    ['run', 'serve'],
    {
      cwd: `./${name}`,
    }
  ) // cwd表示运行的文件夹
  log(
    chalk.green(` 
  👌安装完成： 
  To get Start: 
  ===========================    
  cd ${name}    
  npm run serve 
  =========================== 
  `)
  )
}
