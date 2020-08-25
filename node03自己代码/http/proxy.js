let express = require('express')
let app = express()
const { createProxyMiddleware } = require('http-proxy-middleware')
app.use(express.static(__dirname + '/'))
app.use('/api', createProxyMiddleware({ target: 'http://localhost:4000' })) //对api的请求 域名和端口和协议直接转成target设置
app.listen(3000)
