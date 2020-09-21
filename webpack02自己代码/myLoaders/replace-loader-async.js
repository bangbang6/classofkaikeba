//不能是箭头函数
//必须有返回值
/**
 *
 * @param {*} content 匹配文件内容
 * 返回的内容就是修改后匹配文件的内容
 */
module.exports = function (content) {
  let name = this.query.name
  const result = content.replace('login', name)
  let callback = this.async() //告诉webpack代码有异步 callback就是this.callback 所以就得用callback返回啦
  setTimeout(() => {
    return callback(null, result)
  }, 2000)
  //this.callback(null, result)
}
