const http = require('http')
const fs = require('fs')
//hhtp协议
const server = http.createServer((request, response) => {
  // console.log('this is a request',getPrototypeChain(request))
  // response.end('Hello 666') // 1
  // response = '666' // Koa
  // 信达雅

  const { url, method, headers } = request
  console.log('cookie', request.headers.cookie)
  if (url === '/' && method === 'GET') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        response.writeHead(500, {
          'Content-Type': 'text/plain;charset=utf-8',
        })
        response.end('500 服气')
        return
      }
      response.statusCode = 200
      response.setHeader('Content-Type', 'text/html')
      response.end(data)
    })
  } else if (url === '/api/users' && method === 'GET') {
    //设置跨域允许
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.setHeader('Set-Cookie', 'cookie1=va314') //!返给前端一个cookie 下次前端只要是同域请求都会自动携带cookie字段
    response.setHeader('Access-Control-Allow-Credentials', 'true') //!跨域请求加上这个配置表示也能收到cookie cookie是存在浏览器里的和浏览器相关 刷新也不会消失

    response.writeHead(200, {
      'Content-Type': 'application/json',
    })

    response.end(JSON.stringify([{ name: 'tom' }]))
  } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
    fs.createReadStream('.' + url).pipe(response) // ./1.png
  } else if (method === 'OPTIONS' && url === '/api/users') {
    //浏览器在当前真实请求是非简单请求且跨域的情况下会发起options预检请求 //!跨域且非简单才会有options
    response.setHeader('Access-Control-Allow-Credentials', 'true')

    response.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Headers': 'X-Token,Content-Type',
      'Access-Control-Allow-Methods': 'PUT',
    })
    response.end()
  } else if (method === 'POST' && url === '/api/save') {
    //流接收
    let retData = []
    let size = 0
    request.on('data', (data) => {
      retData.push(data)
      size += data.length
    })
    request.on('end', () => {
      const data = Buffer.concat(retData, size)
      console.log('data', data.toString())
      response.end(`formdata:${data.toString()}`)
    })
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/plain;charset=utf-8')
    response.end('404 页面没有 。。。')
  }
})

function getPrototypeChain(obj) {
  const protoChain = []
  while ((obj = Object.getPrototypeOf(obj))) {
    protoChain.push(obj)
  }
  return protoChain
}

server.listen(4000, () => {
  console.log('Server is start at 4000')
})
