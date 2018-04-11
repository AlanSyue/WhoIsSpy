import Koa from 'koa'
import next from 'next'
import Router from 'koa-router'
import serve from 'koa-static'

// context
import logger from './context/logger'
import render from './context/render'
import validate from './context/validate'

import serverRoutes from './routes'

// since this file is used both on the server and the client
// we must place it in client src folder
import clientRoutes from '../src/routes'

import config from '../config'

const app = next({
  dev: DEV,
  dir: './src'
})
const handler = clientRoutes.getRequestHandler(app)

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  server.context.logger = logger
  server.context.render = render
  server.context.validate = validate

  server.use(serve('./static'))

  router.use(serverRoutes)

  router.get('*', async ctx => {
    ctx.res.statusCode = 200
    await handler(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(router.routes())

  server.listen(config.app.port, config.app.host, error => {
    if (error) throw error
    console.log(`> Ready on ${config.app.host}:${config.app.port}`)
  })
})
