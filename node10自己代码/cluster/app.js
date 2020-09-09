const http = require('http')
let server = http.createServer((req, res) => {
  Math.random() > 0.8 ? aa() : 2
  res.end('hello')
})
//!!module.parent用于在没有require的情况下直接运行某段代码，如果是被require的，则不执行。
if (!module.parent) {
  server.listen(3000)
  console.log('listen at 3000')
} else {
  module.exports = server
}
