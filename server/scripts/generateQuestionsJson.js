import fs from 'fs'
import path from 'path'
import pick from 'lodash/pick'

import { Question } from '../models'

(async () => {
  const rawQuestions = await Question.findAll({ raw: true })
  const questions = rawQuestions.map(q => pick(q, [ 'loyal', 'spy' ]))
  const code = JSON.stringify(questions)
  fs.writeFileSync(path.join(__dirname, '../../static/questions.json'), code)
})().then(() => {
  process.exit(0)
}, err => {
  console.log(err)
  process.exit(1)
})
