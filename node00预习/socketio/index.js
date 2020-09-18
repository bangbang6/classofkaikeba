/* const app = require('express')()

const http = require('http').createServer(app) //app实例内部http拿出来创建http

const io = require('socket.io')(http) //再用app内部的http去创建io */
const express = require('express')

var app = express()
var server = app.listen(3000)
var io = require('socket.io').listen(server)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})
//监听链接
io.on('connection', (socket) => {
  console.log('a user connect')
  socket.on('chat message', (msg) => {
    console.log('message enter')
    //收到用户的一条信息
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('disconnected')
  })
})
