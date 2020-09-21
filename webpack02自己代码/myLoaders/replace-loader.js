//不能是箭头函数
//必须有返回值
/**
 *
 * @param {*} content 匹配文件内容
 * 返回的内容就是修改后匹配文件的内容
 */
module.exports = function (content) {
  this.callback(null, content.replace('aaa', 'bbb'))

  //this.callback(null, result)
}
