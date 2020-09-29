const path = require('path')


module.exports = {
  entry: 'src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
}
//-D -dev简单就只是开发环境 //-S --save-dev 就是两个都有就是生产环境也有这个包
