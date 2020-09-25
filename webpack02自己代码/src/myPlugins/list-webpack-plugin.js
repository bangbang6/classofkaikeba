//!暗号：做人嘛，最重要的是开心
module.exports = class listWebpackPlugin {
  constructor(options = {}) {}
  apply(compiler) {
    //compiler是webpack(config)执行的对象
    compiler.hooks.emit.tapAsync('fileList', (compilation, cb) => {
      let len = 0
      let content = []
      Object.keys(compilation.assets).forEach((filename) => {
        len++
        content.push(filename)
      })
      let res = `共${len}个文件 分别是:` + '\n' + content.join('\n')
      compilation.assets['file.txt'] = {
        source: function () {
          return res
        },
        size: function () {
          return 1024
        },
      }
      cb()
    })
  }
}
