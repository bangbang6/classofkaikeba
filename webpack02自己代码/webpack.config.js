const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: { index: './src/index.js', login: './src/login.js' },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name] - [chunkhash:6].js',
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
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new miniCssExtractPlugin({
      filename: 'index - [contenthash:6].css',
    }),
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'], //表示引入生成后文件的index.js
    }),
    new htmlWebpackPlugin({
      template: './src/login.html',
      filename: 'login.html',
      chunks: ['login'], //!生成html自定义引入对应chunk的js 表示引入生成后文件的login.js
    }),
  ],
}
