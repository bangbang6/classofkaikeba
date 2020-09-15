let moment = require('moment')
//node导出一个小部分如下
exports.formatTime = (time) => moment(time).format('YYYY-MM-DD HH:mm:ss')

exports.success = ({ ctx, res = null, message = '请求成功' }) => {
  ctx.body = {
    code: 0,
    data: res,
    message,
  }
  ctx.status = 200
}
