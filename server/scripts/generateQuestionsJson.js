import fs from 'fs'
import path from 'path'
import pick from 'lodash/pick'

import { Question } from '../models'

(async () => {
  const rawQuestions = await Question.findAll({ raw: true })
  const questions = rawQuestions.map(q => pick(q, [ 'loyal', 'spy' ]))
  const code = JSON.stringify(questions)

  const questionsPath = path.join(__dirname, '../../src/models/question.js')
  const questionsCode = fs.readFileSync(questionsPath, 'utf8')
  const questionsVersion = questionsCode.match(/const VERSION = (\d+)/)[1]
  const newQuestionsCode = questionsCode.replace(/const VERSION = (\d+)/g, (line, version) => 'const VERSION = ' + (+version + 1))
  fs.writeFileSync(questionsPath, newQuestionsCode)
  fs.writeFileSync(path.join(__dirname, `../../static/questions-${+questionsVersion + 1}.json`), code)
  try {
    fs.unlinkSync(path.join(__dirname, `../../static/questions-${questionsVersion}.json`))
  } catch (e) {}
})().then(() => {
  process.exit(0)
}, err => {
  console.log(err)
  process.exit(1)
})
