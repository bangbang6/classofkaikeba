//vue项目的配置 是node的环境
let resolve = (dir) => require('path').join(__dirname, dir)
console.log(process.env.foo)
console.log(process.env.VUE_APP_BANG) //客户端也可以用
module.exports = {
  publicPath: '/bai',
  //vue-cli服务器
  devServer: {
    port: 7070,
    //解决跨域问题代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:2000', //目标服务器最终地址
        changeOrigin: true, //代理服务器改变head的origin这个字段
        pathRewrite: {
          ['^' + '/api']: '', //把本地请求url的"/api"前缀删掉
        },
      },
    },
  },
  //配置webpack 重要

  /* configureWebpack: {
    name: 'vue项目最佳实践',
    resolve: {
      alias: {
        //__dirname是文件名
        comps: require('path').join(__dirname, 'src/components'),
      },
    },
  }, */
  //第二种配置方法是函数传入config配置
  configureWebpack: (config) => {
    config.resolve.alias.comps = require('path').join(
      __dirname,
      'src/components'
    )
    //环境变量 process是node环境内置的变量 env表示版本
    if (process.env.NODE_ENV === 'development') {
      config.name = 'vue best practice'
    } else {
      config.name = 'vue项目最佳实践'
    }
  },
  //链式webpack配置 和上面一样不过是更好操作
  chainWebpack(config) {
    //1.让vue-cli自带的svg处理的loader删除 数组用add
    config.module.rule('svg').exclude.add(resolve('src/icons'))
    //2.添上我们自己的svg-sprite-loader给svg添加
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
  },
}
