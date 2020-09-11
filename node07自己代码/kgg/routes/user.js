module.exports = {
  // /user/
  'get /': async (kkb) => {
    
    let name = await kkb.$service.user.getName()
    kkb.ctx.body = name
  },
  'get /detail': async (kkb) => {
    kkb.ctx.body = await kkb.$service.user.getAge()
  },
}
