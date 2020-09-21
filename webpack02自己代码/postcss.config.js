module.exports = {
  plugins: [
    require('autoprefixer')({
      //兼容最近两个版本 兼容市场占用率大于百分之一的浏览器
      overrideBrowserslist: ['last 2 versions', '>1%'],
    }),
  ],
}
