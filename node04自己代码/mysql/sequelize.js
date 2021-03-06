;(async () => {
  const Sequelize = require('sequelize')
  // !建立连接
  const sequelize = new Sequelize('shop', 'root', '15798015790liao', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false, // 仍可通过传入 operators map 至 operatorsAliases 的方式来使用字符串运算符，但会返回弃用警告
  })
  // !定义模型   通过操作对象来操作数据表
  const Fruit = sequelize.define(
    'Fruit',
    {
      name: { type: Sequelize.STRING(20), allowNull: false },
      price: { type: Sequelize.FLOAT, allowNull: false },
      stock: { type: Sequelize.INTEGER, defaultValue: 0 },
    },
    { tableName: 'fruit' }
  )
  // 同步数据库，force: true则会删除已存在表    //!模型建表
  let ret = await Fruit.sync({ force: true })
  console.log('sync', ret)
  //!插入数据
  ret = await Fruit.create({ name: '香蕉', price: 3.5 })
  console.log('create', ret)
})()
