const request = require('request')
//自动化请求接口
setInterval(() => {
  request('http://localhost:3000', function (error, response, body) {
    console.log('body:', body) // Print the HTML for the Google homepage.
  })
}, 1000)
