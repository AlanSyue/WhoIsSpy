import clamp from 'lodash/clamp'
import { Provider } from 'react-redux'

import { GameContainer } from '~/modules/game'

import store from '~/models'

import {
  MAX_PLAYER,
  MIN_PLAYER
} from '~/constants/common'

export default class extends React.Component {
  static getInitialProps = async ({ query }) => {
    const whiteboard = query.whiteboard
    const player = clamp(+query.player || 0, MIN_PLAYER, MAX_PLAYER)
    const spy = clamp(+query.spy || 0, 1, Math.ceil(player / 4) - whiteboard)

    return {
      query: {
        player,
        spy,
        whiteboard
      }
    }
  }

  render = () => (
    <Provider store={store}>
      <GameContainer {...this.props}/>
    </Provider>
  )
}
