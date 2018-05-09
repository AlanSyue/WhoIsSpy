import pick from 'lodash/pick'

import { API_HOST } from '~/constants/common'

export default {
  // initial state
  state: {
    loyal: '',
    spy: ''
  },
  // handle state changes with pure functions
  reducers: {
    getQuestion(state, payload) {
      return pick(payload, [ 'loyal', 'spy' ])
    }
  },
  // handle state changes with impure functions.
  // use async/await for async actions
  effects: {
    async getQuestionAsync(payload = {}, rootState) {
      const host = process.env.NODE_ENV === 'production' ? API_HOST : ''
      let question

      try {
        question = await fetch(`${host}/v1/questions/random` + (payload.prevLoyal ? `?prevLoyal=${payload.prevLoyal}` : ''))
          .then(res => res.json())
      } catch (err) {
        if (err instanceof TypeError && err.message === 'Failed to fetch') {
          const questions = await fetch('/questions.json').then(res => res.json())
          const filteredQuestions = questions.filter(q => q.loyal !== payload.prevLoyal)
          question = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)]
        }
      }

      this.getQuestion(question)
    },

    resetQuestion() {
      this.getQuestion({
        loyal: '',
        spy: ''
      })
    }
  }
}