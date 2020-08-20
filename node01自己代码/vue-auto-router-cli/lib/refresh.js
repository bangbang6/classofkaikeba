let fs = require('fs')
let handlebars = require('handlebars')

/**
 * 编译模板
 * @param {*} meta 传入模板的数据
 * @param {*} filePath 生成的目标文件
 * @param {*} templatePath 模板文件
 */
function compile(meta, filePath, templatePath) {
  if (fs.existsSync(templatePath)) {
    let content = fs.readFileSync(templatePath).toString()
    let result = handlebars.compile(content)(meta) //先编译模板在编译数据 第一函数是生成render最后传入数据生成最终文件
    fs.writeFileSync(filePath, result)
    console.log(`🚀 ${filePath}编译成功`)
  }
}
module.exports = async () => {
  let list = fs
    .readdirSync('./src/views')
    .filter((v) => v !== 'Home.vue')
    .map((v) => ({ name: v.replace('.vue', '').toLowerCase(), file: v }))
  //当前脚本执行的文件是。/相对路径因为调用此函数的不是这个cli而是在命令行使用kkb refresh 时候的文件夹
  compile({ list }, './src/router.js', './template/router.js.hbs')
  compile({ list }, './src/App.vue', './template/App.vue.hbs')
}
