import { connect } from 'react-redux'

import GamePage from './GamePage'

const GameContainer = connect(state => ({
  loading: state.loading.models.question,
  question: state.question
}), ({ question: { getQuestionAsync }}) => ({
  getQuestionAsync
}))(GamePage)

export default GameContainer
