import pick from 'lodash/pick'

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
    async getQuestionAsync(payload, rootState) {
      const question = await fetch('/v1/questions/random').then(res => res.json())

      this.getQuestion(question)
    }
  }
}