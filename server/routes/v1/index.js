import Router from 'koa-router'

const router = new Router()

const questions = require('./questions')

router.get('/questions', questions.list)
router.get('/questions/random', questions.random)
router.post('/questions', questions.create)
router.delete('/questions/:id', questions.destroy)

export default router.routes()
