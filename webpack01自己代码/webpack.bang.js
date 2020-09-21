const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //!生成html文件插件 自动引入生成的js文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  //entry用对象可以支持多页面  字符串方式也是转成对象 默认的key是main array,string,object
  entry: {
    a: './src/a.js',
    index: './src/index.js', //!key对应的是chunks的名字  //!entry有几个key就有几个chunk //!但是chunk不能打到同一个出口文件 //!所以要用占位符name去指定出口文件名
    //会导出index.js a.js两个包
  },
  //none development product 设置成None的话很多自支持的插件不开启  development会开启一部分插件 production又会开启部分插件关闭某部分插件 比如压缩插件就不开启
  mode: 'development', //指定development(开发模式) 开发的肯定让用户看得懂 打包后代码不是压缩的
  output: {
    //有两个字段 filename,path
    //必须绝对路径  //!npx功能先在Nodemodelus里面找可执行文件 找不到就去系统环境变量PATH里面找可执行文件 再找不到就会帮你安装
    path: path.resolve(__dirname, './dist'),
    //资源名称 占位符和entry的key对应 //!适合多页面应用快速找到文件名对应的文件

    filename: '[name] - [hash:6].js',
  },
  //!module 就是告诉webpack如何支持更多的模块
  module: {
    //css-loader只是帮助webpack处理css文件 但是没法使用打包后的js里的css 要用style-loader 可以加个style标签然后把打包后的css提取到style里面  多个loader由执行顺序 自后往前
    //一个模块可以使用多个loader 比如css文件module 使用'style-loader', 'css-loader'
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: './src/index.html', //以哪个文件为模板
      filename: 'bang.html',
    }),
  ],
}
//单页面是由Import export 来连接到一起的
//spa单入口 simple mpa 多路口 mutiple
//!常用的占位符 [name] [hash] [chunkhash] [contenthash]
//![name]:出口文件名
//![hash] :就是webpack某次打包自己生成的hash值 可以在命令行中看到 可以通过冒号来控制位数
//hash值什么时候变化？ //!只要源码内容发生变化就变 不是打包一次就变化一次 要内容变
//![chunkhash] 和 [hash] 和 [contenthash] 什么区别?
//1.hash://!只要源码内容发生变化就变 不是打包一次就变化一次 要内容变

//2.contenthash//!自身内容发生变化才会改变 比如js css都有hash 但是改了js css如果用hash的话就都会变 用contenthash的话 js变了css的contenthash不会变
//3.chunkhash //!自身chunk相关的内容发生变化时候才会发生变化
//loader: webpack只会处理js json文件 其他文件就不知道怎么处理

//plugin 扩展webpack功能
//module:任何一个源文件都是module 模块
//buddle:生成的js都是Buddle文件 输出的资源文件就是Buddle文件

//module buddle chunk三个关系：
//buddle:由webpack启动函数 和模块处理后的信息组成的 //!处理后的一个文件叫一个Buddle //一般单入口就一个Buddle(代码拆分后一个路口也有多个Buddle，比如抽离库文件) 多路口就多个buddle buddle=启动函数+chunks
//chunk 代码片段 一个模块被webpack处理后会加一些冗余代码称为chunk //!比如简单的就加eval的片段 //chunks：index.js引入啦a.js 那么最后打包出来就有两个{'index.js'：xxx,'a.js':xx}chunk共同组成chucks
//module://!任何一个源文件都是module(包括html,css文件) 模块
//!一个buddle 有多个chunk(因为单路口 但是这个路口可以引入多个文件) 一个chunk对应一个module 一个chunks对应一个或者多个Module 一个buddle对应一个chunks 一个chunks对应一个buddle文件的所有chunk

//!静态导入: 模块依赖关系的建立发生在代码编译阶段 export const name='calculator'; import {name} from './calculator.js'; 不用等运行在导入直接是导入啦所以必须放在最上面 路径是静态的
//!动态导入 v：模块依赖关系的建立发生在代码运行阶段 可以放在if语句里面 且路径是可以是表达式
/*
B文件
//calculator.js
module.exports={name:"calculator"};

A文件
//index.js
const name=require('./calculator.js').name;
*/
//并将其module.exports对象作为require函数的返回值进行返回。并且require的模块路径可以动态指定，并支持传入一个表达式或者一个if进行判断是否加载模块。因此可以看出，在commonJS模块被执行前，并没有办法确定明确的依赖关系，模块的导入、导出发生在代码的运行阶段。
