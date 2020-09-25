//!获取webpack生命钩子在里面来插入自己的操作
class txtWebpackPlugin {
  constructor(options = {}) {}
  apply(compiler) {
    //触发emit事件 webpack执行到这时候文件成什么样了compilation就是什么 cb就是继续往下走webpack流程 异步
    compiler.hooks.emit.tapAsync('txtWebpackPlugin', (compilation, cb) => {
      //资源对象 assets即生成后的文件组成的对象 index.html:xx index.js:xxx
      compilation.assets['test.txt'] = {
        source: function () {
          return 'hello webpack 04'
        },
        size: function () {
          return 1024
        },
      }
      cb()
    })
    //同步
    compiler.hooks.compile.tap('txtWebpackPlugin', (compilation) => {
      console.log('hello compiler')
    })
  }
}
module.exports = txtWebpackPlugin
