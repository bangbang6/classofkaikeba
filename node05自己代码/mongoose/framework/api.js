module.exports = {
  /**
   * 将我们访问的model表存放在ctx.list中
   * @param {*} ctx
   * @param {*} next
   */
  async init(ctx, next) {
    console.log('params', ctx.params)
    const model = ctx.app.$model[ctx.params.list]
    if (model) {
      ctx.list = model
      await next()
    } else {
      ctx.body = 'no this model'
    }
  },

  async list(ctx) {
    ctx.body = await ctx.list.find({})
  },
  async get(ctx) {
    ctx.body = await ctx.list.findOne({ _id: ctx.params.id })
  },
  async create(ctx) {
    const res = await ctx.list.create(ctx.request.body)
    ctx.body = res
  },
  async update(ctx) {
    const res = await ctx.list.updateOne(
      { _id: ctx.params.id },
      ctx.request.body
    )
    ctx.body = res
  },
  async del(ctx) {
    const res = await ctx.list.deleteOne({ _id: ctx.params.id })
    ctx.body = res
  },
  async page(ctx) {
    console.log('page...', ctx.params.page)
    ctx.body = await ctx.list.find({}) /*  */
  },
}
