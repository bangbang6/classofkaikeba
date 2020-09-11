;(async () => {
  //引入客户端

  const { MongoClient } = require('mongodb')

  //链接数据库

  let client = new MongoClient('mongodb://localhost:27017', {
    useNewUrlParser: true,
  })

  let ret = await client.connect()

  //!创建数据库
  let db = client.db('test')

  //!创建表
  let fruits = db.collection('fruits')

  //!插入数据
  let res = await fruits.insertOne({ name: '香蕉', price: 3 })

  //关闭
  client.close()
})()
