const fs = require('fs')
const parser = require('@babel/parser')
const path = require('path')
const traverse = require('@babel/traverse').default

const { transformFromAst } = require('@babel/core') //核心插件 其实babel对语法的转换是在preset-env这个预设插件里 core只是有一些工具而已
module.exports = class Webpack {
  constructor(options) {
    this.entry = options.entry
    this.output = options.output
    this.modules = []
    this.mode = options.mode || 'production'
  }
  run() {
    const info = this.parse(this.entry)
    //递归处理依赖
    this.modules.push(info)
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i]
      const { dependencies } = item
      if (dependencies) {
        for (let j in dependencies) {
          this.modules.push(this.parse(dependencies[j]))
        }
      }
    }
    //数组转成 webpack的对象module形式
    const webpackResult = {}
    this.modules.forEach((item) => {
      webpackResult[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code,
      }
    })
    console.log(webpackResult)

    //生成webpack打包后的代码
    this.file(webpackResult)
  }
  //!暗号：有点感动啦怎么办?
  parse(entryFile) {
    let content = fs.readFileSync(entryFile, 'utf-8')
    const ast = parser.parse(content, { sourceType: 'module' })
    const dependencies = {}
    //!parse是变成抽象语法树 traverse是对抽象语法树增删改查
    //!traverse过滤出专门的节点类型  也可以改变ast里面某个节点数据(获取到专门节点改或者用enter函数里面判断是否是你要的节点去改)
    traverse(ast, {
      ImportDeclaration: function ({ node }) {
        //node是js文件的一行代码的类型

        const pathName = path.dirname(entryFile) //获取外层路径 ./src/a.js => ./src

        const outFileUrl = './' + path.join(pathName, node.source.value)
        dependencies[node.source.value] = outFileUrl
      },
    })
    //!transformFromAst抽象语法树转代码 import 转成 require等 把代码转成啦webpack的code模块
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env'],
    })
    //console.log('ast', ast.program.body)
    return {
      entryFile,
      dependencies,
      code,
    }
  }
  file(modules) {
    //生成输出文件
    const filePath = path.join(this.output.path, this.output.filename)

    //生成文件内容

    const buddle = `(function(modules){
      function require(modulePath){
        //就是在外层一个对象就能记入传出传入的数据
        var exports = {}
        //!采用形参和实参的方式 传一个自己写的实参当作函数参数取去改变函数里面的逻辑 相当于添加自己的一层逻辑
        //定义自己的require 否则他会调用下面的require 这样路径会有问题 一个是相当于src里面的 一个是相当于项目因为在dist下执行此语句的 相当于改变下require路径
        function newRequire(relativePath){
          return require(modules[modulePath].dependencies[relativePath]) 
        }
        (function(require,exports ,code){
          //自执行require进来的代码
          eval(code)
        })(newRequire,exports,modules[modulePath].code)
        //返回导出的东西 方便别人require时候得到里面exports的对象
        return exports
      }
      require('${this.entry}')
    })(
      ${JSON.stringify(modules)}
    )
    
    `
    fs.writeFileSync(filePath, buddle, 'utf-8')
  }
}
