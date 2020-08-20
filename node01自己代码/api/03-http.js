let http = require('http')
const fs = require('fs')
//前端访问实现回调
let server = http.createServer((request, response) => {
  //console.log(getPrototypeChain(request))
  let { url, method, headers } = request
  if (url === '/' && method === 'GET') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' }) // 表示普通文本 plain是种子普通的意识
        response.end('500出错了')
      } else {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8') //表四html文本
        response.end(data) // end可以出来二进制数据
      }
    })
  } else if (url === '/users' && method === 'GET') {
    response.setHeader('Content-Type', 'application/json') //表示json对象

    response.end(JSON.stringify({ name: 'liao' }))
  } else if (headers.accept && method === 'GET') {
    let picUrl = '.' + url
    /* fs.readFile(picUrl, (err, data) => {
      response.end(data)
    }) */
    //用流
    rs = fs.createReadStream(picUrl)
    rs.pipe(response) // 把rs流放导入到response大流里面
  } else {
    response.statusCode = 404
    response.end('404')
  }
})

function getPrototypeChain(obj) {
  let protoChain = []
  //原型是父类的实例 new Parent = Child.prototyppe
  while ((obj = Object.getPrototypeOf(obj))) {
    protoChain.push(obj)
  }
  return protoChain
}
//后台程序监听成功执行回调
server.listen(3000, () => {
  console.log('listen 3000')
})
