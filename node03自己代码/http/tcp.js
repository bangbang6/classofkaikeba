let net = require('net')
//tcp
let chatServer = net.createServer() //创建后台服务器
let clientList = [] //客户端列表
//服务端监听链接事件 这里就是单向通信 客户端主动传数据给后端可以 但是服务端想主动给客户端数据就不行
chatServer.on('connection', (client) => {
  //客户端也是一个流 客户端流里面写hi
  client.write('hi\n')
  clientList.push(client)
  //监听客户端传输给服务端数据的事件
  client.on('data', (data) => {
    console.log('recv', data.toString())
    //广播给所有的客户端
    clientList.forEach((v) => {
      v.write(data)
    })
  })
})

chatServer.listen(9000)
