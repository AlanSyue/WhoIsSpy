import Router from 'koa-router'

import v1 from './v1'

import bodyParserMiddleWare from './middlewares/bodyParser'
import corsMiddleWare from './middlewares/cors'
import errorRecoverMiddleWare from './middlewares/errorRecover'
import loggerMiddleWare from './middlewares/logger'

import config from '../../config'
import { makePublicRouterInstance } from 'next/dist/lib/router';

const router = new Router()

router.use(loggerMiddleWare)
router.use(errorRecoverMiddleWare)
router.use(bodyParserMiddleWare)
router.use(corsMiddleWare)

router.use('/v1', v1)

export default router.routes()
