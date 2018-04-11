module.exports = async (ctx, next) => {
  try {
    await next()

    ctx.logger.info({
      req: ctx.request,
      res: ctx.response
    })
  } catch (err) {
    ctx.logger.error({
      req: ctx.request,
      res: ctx.response,
      err
    })
  }
}
