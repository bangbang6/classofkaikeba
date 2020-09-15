let { Service } = require('egg')

class UserAccess extends Service {
  async login(payload) {
    let { ctx, service } = this
    let user = await service.user.findByMobile(payload.mobile)

    if (!user) ctx.throw(404, 'user not find')
    //明文和密文比较
    let verifyPassword = await ctx.compare(payload.password, user.password)

    if (!verifyPassword) ctx.throw(404, 'password not right')

    //给用户token
    return {
      token: await service.actionToken.apply(user._id),
    }
  }
  async current() {
    let { ctx, service } = this
    let _id = ctx.state.user.data._id

    let user = await service.user.find(_id)
    if (!user) ctx.throw(404, 'user not find')

    user.password = 'hahaha'
    return user
  }
}
module.exports = UserAccess
