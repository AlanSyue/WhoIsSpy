import config from '../../../config'

export default async (ctx, next) => {
  await next()

  // Website you wish to allow to connect
  ctx.set('Access-Control-Allow-Origin', config.webUrl)

  // Request methods you wish to allow
  ctx.set('Access-Control-Allow-Methods', 'GET')
}
