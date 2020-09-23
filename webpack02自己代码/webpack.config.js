const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
//glob 读取文件 比readFile厉害
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')
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
    filename: '[name] - [chunkhash:6].js',
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
        test: '/.woff2$/',
        use: 'file-loader', //对所有文件进行处理 一般是图片 字体等
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
  ],
}
//inline-source-map会把map文件放到Buddle里面而不是生成map文件 所以会增大Buudle体积
//!webpack-dev-server 就是用server启动个服务来打包(把打包的内容放到内存里而不是文件生成 照样可以打开Index.html) 而不是运行webpack来启动
