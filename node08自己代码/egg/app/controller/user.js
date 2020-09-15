const Controller = require('egg').Controller
/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  constructor(ctx) {
    super(ctx)
  }
  /**
   * @summary 创建⽤户
   * @description 创建⽤户，记录⽤户账户/密码/类型
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx } = this
    ctx.validate(ctx.rule.createUserRequest)
    let payload = ctx.request.body || {}
    let res = await this.service.user.create(payload)
    console.log('res', res)
    //正常应答
    ctx.helper.success({ ctx, res })
  }
}

module.exports = UserController
