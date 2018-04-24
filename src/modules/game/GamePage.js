import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import shuffle from 'lodash/shuffle'
import styled from 'styled-components'

import Deck from './Deck'

import locale from '~/constants/locale'

const Container = styled.div`
  position: relative;
  color: white;
  height: 100%;
  width: 100%;
`

class Card {
  constructor ({ question, type }) {
    this.question = question
    this.type = type
  }
}

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
      cards: []
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
    const { cards } = this.state

    if (!cards.length) return null

    return (
      <Container>
        <Deck cards={cards}/>
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
}
