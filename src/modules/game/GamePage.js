import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import shuffle from 'lodash/shuffle'
import styled from 'styled-components'

import Card from './Card'
import Deck from './Deck'
import PlayerGallery from './PlayerGallery'

import locale from '~/constants/locale'
import theme from '~/constants/theme'

const Container = styled.div`
  position: relative;
  color: white;
  height: 100%;
  width: 100%;
`

export default class GamePage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    query: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    getQuestionAsync: PropTypes.func.isRequired
  }

  static defaultProps = {
    query: {},
    getQuestionAsync: noop
  }

  constructor (props) {
    super(props)

    this.state = {
      cards: [],
      showDeck: true,
      showForgetIndex: -1
    }
  }

  componentDidMount = () => {
    this.props.getQuestionAsync()
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.question.loyal !== nextProps.question.loyal) {
      this.initialCards(nextProps)
    }
  }

  render = () => {
    const { cards, showDeck, showForgetIndex } = this.state

    if (!cards.length) return null

    return (
      <Container>
        <PlayerGallery
          cards={cards}
          showFooter={!showDeck}
          onExecute={this.handleExecute}
          onForget={this.handleForget}/>
        <Deck
          cards={cards}
          showDeck={showDeck}
          showForgetIndex={showForgetIndex}
          onForgetContainerClick={this.handleForgetContainerClick}
          onShot={this.handleShot}/>
      </Container>
    )
  }

  handleShot = ({ dataUrl, index }) => {
    const { cards } = this.state

    cards[index].setSrc(dataUrl)

    this.setState({ cards })

    // last shot
    if (index >= cards.length - 1) {
      this.setState({ showDeck: false })
    }
  }

  handleForgetContainerClick = e => {
    this.setState({ showForgetIndex: -1 })
  }

  handleForget = index => e => {
    this.setState({ showForgetIndex: index })
  }

  handleExecute = index => e => {
    const { cards } = this.state

    cards[index].reveal()

    this.setState({ cards }, this.gudgeGame)
  }

  initialCards = ({ query: { loyal, spy, whiteboard }, question }) => {
    const cards = []
    const pushCard = (question, type) => cards.push(new Card({ question, type }))

    range(loyal).map(() => pushCard(question.loyal, 'loyal'))
    range(spy).map(() => pushCard(question.spy, 'spy'))
    range(whiteboard).map(() => pushCard(locale('game.whiteboard'), 'whiteboard'))

    this.setState({ cards: shuffle(cards) })
  }

  gudgeGame = () => {
    console.log('gudgeGame');
  }
}
