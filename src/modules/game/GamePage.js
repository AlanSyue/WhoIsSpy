import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import shuffle from 'lodash/shuffle'
import styled from 'styled-components'

import Card from './Card'
import Deck from './Deck'
import PlayerGallery from './PlayerGallery'

import locale from '~/constants/locale'

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
      showDeck: true
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
    const { cards, showDeck } = this.state

    if (!cards.length) return null

    return (
      <Container>
        <PlayerGallery cards={cards}/>
        {showDeck && <Deck cards={cards} onShot={this.handleShot}/>}
      </Container>
    )
  }

  initialCards = ({ query: { loyal, spy, whiteboard }, question }) => {
    const cards = []
    const pushCard = (question, type) => cards.push(new Card({ question, type }))

    range(loyal).map(() => pushCard(question.loyal, 'loyal'))
    range(spy).map(() => pushCard(question.spy, 'spy'))
    range(whiteboard).map(() => pushCard(locale('game.whiteboard'), 'whiteboard'))

    this.setState({ cards: shuffle(cards) })
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
}
