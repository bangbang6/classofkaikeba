//定时返回一个promisify的数据
let delay = (data, tick) =>
  new Promise((reslove) => {
    setImmediate(() => {
      reslove(data)
    }, tick)
  })

module.exports = (kkb) => ({
  getName() {
    return kkb.$model.user.findAll()
  },
  getAge() {
    return 20
  },
})
