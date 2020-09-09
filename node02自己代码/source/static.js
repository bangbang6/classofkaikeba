let path = require('path')
let fs = require('fs')

module.exports = (dirpath = './public') => {
  return async (ctx, next) => {
    if (ctx.url.indexOf('/public') === 0) {
      //找到静态文件目录
      let url = path.resolve(__dirname, dirpath)
      console.log('目录', url)
      const fileBaseName = path.basename(url)
      //拆分出文件名
      let filename = url + ctx.url.replace('/public', '')
      console.log('filename', filename)
      try {
        let stats = fs.statSync(filename)
        if (stats.isDirectory()) {
          let ret = ['<div style="padding-left:20px">']
          const dir = fs.readdirSync(filename)
          dir.forEach((filename) => {
            if (filename.indexOf('.') > -1) {
              ret.push(
                `<p><a style="color:black" 
                href="${ctx.url}/${filename}">${filename}</a></p>`
              )
            } else {
              //文件
              ret.push(
                `<p><a href="${ctx.url}/${filename}">${filename}</a></p>`
              )
            }
          })
          ret.push('</div>')
          ctx.body = ret.join('')
        } else {
          //文件
          let content = fs.readFileSync(filename)
          console.log('content', content)
          ctx.body = content
        }
      } catch (e) {
        ctx.body = '404'
      }
    } else {
      await next()
    }
  }
}
