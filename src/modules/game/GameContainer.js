import clamp from 'lodash/clamp'
import { connect } from 'react-redux'
import querystring from 'querystring'

import GamePage from './GamePage'

import {
  MAX_PLAYER,
  MIN_PLAYER
} from '~/constants/common'

const GameContainer = connect(state => {
  let query = {}

  if (typeof window !== 'undefined') {
    const q = querystring.parse(location.search.replace('?', ''))
    const whiteboard = +q.whiteboard
    const player = clamp(+q.player || 0, MIN_PLAYER, MAX_PLAYER)
    const spy = clamp(+q.spy || 0, 1, Math.ceil(player / 4) - whiteboard)

    query = {
      loyal: player - spy - whiteboard,
      player,
      spy,
      whiteboard
    }
  }

  return {
    loading: state.loading.models.question,
    question: state.question,
    query
  }
}, ({ question: { getQuestionAsync, resetQuestion }}) => ({
  getQuestionAsync,
  resetQuestion
}))(GamePage)

export default GameContainer
