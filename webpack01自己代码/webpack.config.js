const path = require('path')
module.exports = {
  entry: './src/index.js',
  mode: 'development', //指定development(开发模式) 开发的肯定让用户看得懂 打包后代码不是压缩的
  output: {
    //有两个字段 filename,path
    //必须绝对路径  //!npx功能先在Nodemodelus里面找可执行文件 找不到就去系统环境变量PATH里面找可执行文件 再找不到就会帮你安装
    path: path.resolve(__dirname, './dist'),
    //资源名称 占位符和entry的key对应 适合多页面应用快速找到文件名对应的文件
    filename: '[name].js',
  },
}
//spa 单页面 mpa 多页面
