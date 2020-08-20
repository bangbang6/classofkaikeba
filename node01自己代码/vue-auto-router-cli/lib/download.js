let {promisify} = require('util')
let download = promisify(require('download-git-repo'))
let ora = require('ora') //进度条
/**
 * git上下载代码且有进度条提示
 * @param {*} repo git地址 
 * @param {*} desc 代码放到哪里去
 */
module.exports.clone = async function (repo,desc){

  let process = ora(`下载......${repo}`)
  process.start()
  await download(repo,desc)
  process.succeed()
}