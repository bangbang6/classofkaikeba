let express = require('express') //获取express 构造函数

let app = express() // 获取express 实例
app.get('/', (req, res) => {
  //send返回基本字符串 json返回json对象
  res.send(
    `<html>
      <body><div>index</div></body>
    </html>
    `
  )
})
app.listen(3000)
