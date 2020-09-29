;(function (modules) {
  function require(modulePath) {
    //就是在外层一个对象就能记入传出传入的数据
    var exports = {}
    //!采用形参和实参的方式 传一个自己写的实参当作函数参数取去改变函数里面的逻辑 相当于添加自己的一层逻辑
    //定义自己的require 否则他会调用下面的require 这样路径会有问题 一个是相当于src里面的 一个是相当于项目因为在dist下执行此语句的 相当于改变下require路径
    function newRequire(relativePath) {
      return require(modules[modulePath].dependencies[relativePath])
    }
    ;(function (require, exports, code) {
      //自执行require进来的代码
      eval(code)
    })(newRequire, exports, modules[modulePath].code)
    //返回导出的东西 方便别人require时候得到里面exports的对象
    return exports
  }
  require('src/index.js')
})({
  'src/index.js': {
    dependencies: { './a.js': './src\\a.js', './b.js': './src\\b.js' },
    code:
      '"use strict";\n\nvar _a = require("./a.js");\n\nvar _b = require("./b.js");\n\nconsole.log("".concat(_a.str, " 666") + _b.str2);',
  },
  './src\\a.js': {
    dependencies: {},
    code:
      '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.str = void 0;\nvar str = \'bang\';\nexports.str = str;',
  },
  './src\\b.js': {
    dependencies: {},
    code:
      '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.str2 = void 0;\nvar str2 = \'liao\';\nexports.str2 = str2;',
  },
})
