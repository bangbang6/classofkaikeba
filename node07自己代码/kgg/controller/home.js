module.exports = {
  index: async (kkb) => {
    let name = await kkb.$service.user.getName()
    kkb.ctx.body = name
  },
  detail: async (kkb) => {
    let name = await kkb.$service.user.getName()
    kkb.ctx.body = name
  },
}
