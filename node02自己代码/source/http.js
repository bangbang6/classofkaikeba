let http = require('http')

http
  .createServer((req, res) => {
    res.end('hello http')
  })
  .listen(3000, () => {
    console.log('listen at 3000')
  })
