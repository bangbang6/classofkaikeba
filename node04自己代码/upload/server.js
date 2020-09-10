/* console.log(__dirname)
//!表示当前文件的文件夹名字 和在哪运行无关 */

let http = require('http')
let fs = require('fs')
let path = require('path')
let server = http.createServer((req, res) => {
  //解析url
  console.log(req.url)
  let pathname = req.url
  let filename = req.headers['file-name'] ? req.headers['file-name'] : 'abc.png'
  let outputname = path.resolve(__dirname, filename)
  let wfs = fs.createWriteStream(outputname)
  let chunk = []
  let size = 0
  if (pathname === '/upload') {
    req.on('data', (data) => {
      chunk.push(data)
      size += data.length
      console.log('data:', data, size)
    })
    req.on('end', () => {
      console.log('end...')
      const buffer = Buffer.concat(chunk, size)
      size = 0
      fs.writeFileSync(outputname, buffer)
      res.end()
    })
  }
})

server.listen(3000)
