let request = {
  //等待request和req建立联系 在创建服务器的时候建立
  get url() {
    return this.req.url
  },

  get method() {
    return this.req.method.toLowerCase()
  },
}
module.exports = request
