module.exports = async (ctx, next) => {
  console.log(ctx.url)
  await next()
}
