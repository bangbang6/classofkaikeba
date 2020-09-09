let context = {
  get url() {
    return this.request.url
  },
  //body是response不同的私有变量 维护在response里面
  get body() {
    return this.response.body
  },
  get method() {
    return this.request.method
  },
  set body(val) {
    this.response.body = val
  },
}
module.exports = context
