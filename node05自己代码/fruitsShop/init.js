let db = new DbHelper()
db.once('connect', async () => {
  let col = db.col('fruits')

  await col.deleteMany()

  //快速模拟数据
  let data = new Array(200).fill().map((v, i) => {
    return {
      name: 'XXX' + i,
      price: i,
      category: Math.random() > 0.5 ? '水果' : '蔬菜',
    }
  })
  col.insertMany(data)
})
