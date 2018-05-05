import Joi from 'joi'
const { Op } = require('sequelize');

import { Question } from '../../models'

const createSchema = Joi.object().keys({
  loyal: Joi.string().max(255).required(),
  spy: Joi.string().max(255).required()
})

const deleteSchema = Joi.object().keys({
  id: Joi.string().guid()
})

const randomSchema = Joi.object().keys({
  prevLoyal: Joi.string()
})

const formatQuestion = question => ({
  id: question.get('id'),
  loyal: question.get('loyal'),
  spy: question.get('spy')
})
const formatQuestions = questions => questions.map(formatQuestion)

export const list = async (ctx, next) => {
  const questions = await Question.findAll()

  ctx.render(201, formatQuestions(questions))
}

export const random = async (ctx, next) => {
  const { prevLoyal } = await ctx.validate(ctx.query, randomSchema)

  const questions = await Question.findAll(prevLoyal ? {
    where: {
      loyal: {
        [Op.ne]: prevLoyal
      }
    }
  } : {})

  const selectedQuestion = questions[Math.floor(Math.random() * questions.length)]

  ctx.render(201, formatQuestion(selectedQuestion))
}

export const create = async (ctx, next) => {
  const form = await ctx.validate(ctx.request.body, createSchema)

  const question = await Question.create(form)

  ctx.render(201, formatQuestion(question))
}

export const destroy = async (ctx, next) => {
  const { id } = await ctx.validate(ctx.params, deleteSchema)

  const question = await Question.findById(id)

  if (!question) {
    return ctx.render(401, { message: 'Question not found' })
  }

  await question.destroy()

  ctx.render(204)
}
