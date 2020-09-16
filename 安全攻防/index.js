const http = require('http')

http
  .createServer((req, res) => {
    res.end('bang')
  })
  .listen(3000)
