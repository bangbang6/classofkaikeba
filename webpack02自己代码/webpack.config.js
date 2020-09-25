const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
//glob 读取文件 比readFile厉害
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const listWebpackPlugin = require('./src/myPlugins/list-webpack-plugin')
const glob = require('glob')
const webpack = require('webpack')
//!等价交换，炼金术不变的原则
const setMap = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFile = glob.sync(path.join(__dirname, './src/*/index.js'))
  entryFile.map((item, index) => {
    const match = item.match(/src\/(.*)\/index\.js$/)
    const pageName = match[1]

    entry[pageName] = item
    htmlWebpackPlugins.push(
      new htmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName, 'detail'],
      })
    )
  })
  return { entry, htmlWebpackPlugins }
}
const { entry, htmlWebpackPlugins } = setMap()
module.exports = {
  /* entry: {
    index: './src/index.js',
    login: './src/login.js',
    detail: './src/detail.js',
    list: './src/list.js',
  }, */
  //entry: entry,
  entry: { index: './src/index.js' },
  /* new htmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    chunks: ['index'], //表示引入生成后文件的index.js
  }),
  new htmlWebpackPlugin({
    template: './src/login.html',
    filename: 'login.html',
    chunks: ['login'], //!生成html自定义引入对应chunk的js 表示引入生成后buddle文件的login.js
  }),
  new htmlWebpackPlugin({
    template: './src/detail.html',
    filename: 'detail.html',
    chunks: ['detail'], 
  new htmlWebpackPlugin({
    template: './src/list.html',
    filename: 'list.html',
    chunks: ['list'],*/
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name] - [hash:6].js',
  },
  devtool: 'inline-source-map', //!开启源代码和打包后代码的关系映射 这样在前端可以马上定位到出错的地方
  devServer: {
    open: true,
    contentBase: './dist', //dist目录是服务的根目录 默认是src
    proxy: {
      '/api': {
        target: 'http://localhost:3000', //代理模拟数据
      },
    },
    hot: true, //css模块热跟新的配置
    hotOnly: true, //只进行模块热跟新 不刷新浏览器 否则还是会把之前的操作刷新掉 只开这个会导致js改变了但是上没效果 还要进行index3.js里面写模块监听的代码然后手动跟新 webpack给我们提供啦两个loader
    //react(.jsx) 用react-hot-loader vue(.vue)用vue-loader就能实现
  },
  mode: 'development',
  resolveLoader: {
    modules: ['node_modules', './myLoaders'], //!添加webpack查找loader位置的目录
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          //  miniCssExtractPlugin.loader,
          'kkb-style-loader',
          'kkb-css-loader',
          //'postcss-loader',
          'kkb-less-loader',
        ], //less-loader表示将webpack和less桥接起来(less才是处理less语法的) css-loader将css(序列化)才方便打进js里面 style-loader提取变成style标签
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        use: [
          { loader: 'replace-loader' },
          {
            loader: 'replace-loader-async',
            options: {
              name: 'bang',
            },
          },
        ], //use里面会自己require 所以给路径就行 或者模块名
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]', //生成的图片的名字占位符 以前名字是啥现在就是啥  [ext]对应后缀相同 因为test里面有三种后缀
            outputPath: 'images/', //生成文件的路径
            limit: 1024 * 110, //小于这个就会转成base64否则还是生成文件 //!大文件不适合转base64
          },
        },
      },
      {
        test: /.woff2$/,
        use: 'file-loader', //对所有文件进行处理 一般是图片 字体等
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'], //表示引入生成后文件的index.js
    }),
    new CleanWebpackPlugin(),
    //...htmlWebpackPlugins,
    new miniCssExtractPlugin({
      filename: 'index - [contenthash:6].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new listWebpackPlugin(),
  ],
}
//inline-source-map会把map文件放到Buddle里面而不是生成map文件 所以会增大Buudle体积
//!webpack-dev-server 就是用server启动个服务来打包(把打包的内容放到内存里而不是文件生成 照样可以打开Index.html) 而不是运行webpack来启动
//HMR只能在生产环境中使用 任何开发环境相关的配置都不能出现 改变css/js代码 浏览器不用刷新就能动态改变里面的数据
//!polyfill 就是告诉目前环境es的新特性 就支持新的特性啦 比如promise对象，map函数， 对象就是特性  babel是支持语法转换(const->var) 怎么区别特性还是语法？记住特性是不能转换的只能提供这种东东的定义 比如promise 地段浏览器会报找不到Peomise 而const是可以转成之前老的var的所以是语法
//!babel-loader只是把js丢给babel-core 并不处理转换  真正转换的是 "@babel/preset-env"插件:对语法做了转换里面新特性没转(const->var 但是promise没转 低端浏览器无法识别)
//!新特性要用polyfill转
//-d 开发依赖 -s 生产依赖 打包也能上传的依赖
