const { Controller } = require('egg')
//service controller 都在ctx 里面 ctx在this里面都有挂载
class UserController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = await ctx.service.user.getAll()
  }
}
module.exports = UserController
