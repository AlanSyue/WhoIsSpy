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
      resetting: false,
      showDeck: true,
      showForgetIndex: -1,
      showGGDialog: ''
    }
  }

  componentDidMount = () => {
    this.props.getQuestionAsync()
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.question.loyal !== nextProps.question.loyal) {
      const isReplay = !!(this.state.cards[0] || {}).src
      this.initialCards(nextProps, isReplay)
    }
  }

  render = () => {
    const { query } = this.props
    const { cards, resetting, showDeck, showForgetIndex, showGGDialog } = this.state

    if (!cards.length || resetting) return null

    return (
      <Container>
        <PlayerGallery
          cards={cards}
          query={query}
          showFooter={!showDeck}
          showGGDialog={showGGDialog}
          onExecute={this.handleExecute}
          onForget={this.handleForget}
          onReplay={this.handleReplay}/>
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

    cards[index].draw()
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

    this.setState({ cards }, this.judgeGame)
  }

  handleReplay = e => {
    this.setState({
      resetting: true,
      showDeck: true,
      showForgetIndex: -1,
      showGGDialog: ''
    }, () => {
      this.setState({ resetting: false })
      this.props.getQuestionAsync({ prevLoyal: this.props.question.loyal })
    })
  }

  initialCards = ({ query: { loyal, spy, whiteboard }, question }, persistPhoto) => {
    const cards = []
    const pushCard = (question, type) => cards.push(new Card({ question, type }))

    range(loyal).map(() => pushCard(question.loyal, 'loyal'))
    range(spy).map(() => pushCard(question.spy, 'spy'))
    range(whiteboard).map(() => pushCard(locale('game.whiteboard'), 'whiteboard'))

    if (persistPhoto) {
      const photos = shuffle(this.state.cards.map(card => card.src))
      cards.forEach((card, index) => card.setSrc(photos[index]))
    }

    this.setState({ cards: shuffle(cards) })
  }

  judgeGame = () => {
    const { query } = this.props
    const { cards } = this.state
    const revealedLoyals = cards.reduce((count, card) => count + (card.revealed && card.type === 'loyal'), 0)
    const revealedSpys = cards.reduce((count, card) => count + (card.revealed && card.type === 'spy'), 0)

    if (revealedSpys >= query.spy) return this.setState({ showGGDialog: 'loyal' })
    if (revealedLoyals >= query.loyal) return this.setState({ showGGDialog: 'spy' })
  }
}
