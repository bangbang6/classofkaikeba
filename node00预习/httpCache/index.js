function updateTime() {
  this.timer =
    this.timer ||
    setInterval(() => {
      this.time = new Date().toUTCString()
    }, 100)
  return this.time
}
const http = require('http')
http
  .createServer((req, res) => {
    let { url } = req
    if (url === '/') {
      res.end(
        `<html>
        html update time ${updateTime()}
        <script src='main.js'></script></html>`
      )
    } else if (url === '/main.js') {
      const content = `document.writeln('<br>update time :${updateTime()}</br>')`
      //
      res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString()) //过期时间 那么这段时间内都会用老的js //!强缓存

      res.setHeader('Cache-Control', 'max-age=20') //!强缓存
      res.setHeader('Cache-Control', 'on-cache') //取消强缓存
      //协商缓存
      /*  res.setHeader('last-modified', new Date().toUTCString())
      if (
        new Date(req.headers['if-modified-since']).getTime() + 3 * 1000 >
        Date.now()
      ) {
        console.log('协商缓存')
        res.statusCode = 304
        res.end()
        return
      } */
      let crypto = require('crypto')
      const hash = crypto.createHash('sha1').update(content).digest('hex')
      res.setHeader('Etag', hash)
      console.log(hash, req.headers['if-none-match'])
      if (req.headers['if-none-match'] === hash) {
        console.log('Etag 缓存命中')
        res.statusCode = 304
        res.end()
      }
      res.statusCode = 200
      res.end(content)
    } else if (url === '/favicon.ico') {
      res.end('')
    }
  })
  .listen(3000)
