const { Service } = require('egg')

module.exports = class UserService extends Service {
  async getAll() {
    //model文件夹的也自动放到ctx里面啦 且User直接可以操作数据库的对象
    return await this.ctx.model.User.findAll()
  }
}
