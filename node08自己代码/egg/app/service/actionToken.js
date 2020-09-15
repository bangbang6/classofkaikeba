let { Service } = require('egg')

class ActionToken extends Service {
  async apply(_id) {
    let { ctx } = this
    //jwt插件能自动挂载到app
    return ctx.app.jwt.sign(
      {
        data: { _id: _id },
        exp: Math.floor(Date.now() / 1000 + 60 * 60 * 7),
      },
      ctx.app.config.jwt.secret
    )
  }
}

module.exports = ActionToken
