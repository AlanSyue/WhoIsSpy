import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import shuffle from 'lodash/shuffle'
import styled from 'styled-components'

import Alert from '~/modules/common/Alert'
import Button from '~/modules/common/Button'
import Card from './Card'
import Deck from './Deck'
import PlayerGallery from './PlayerGallery'

import locale from '~/constants/locale'
import size from '~/constants/size'
import theme from '~/constants/theme'

const Container = styled.div`
  position: relative;
  color: white;
  height: 100%;
  width: 100%;
  padding-top: ${size.headerHeight};
  max-width: ${size.maxWindowSize}px;
  margin: auto;
`
const Header = styled.div`
  height: ${size.headerHeight};
  width: 100%;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${size.maxWindowSize}px;
`
const HeaderButtonContainer = styled.div`
  height: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
`
const HeaderButton = styled.img`
  height: 20px;
`

export default class GamePage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    query: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    getQuestionAsync: PropTypes.func.isRequired,
    resetQuestion: PropTypes.func.isRequired
  }

  static defaultProps = {
    query: {},
    getQuestionAsync: noop,
    resetQuestion: noop
  }

  constructor (props) {
    super(props)

    this.state = {
      cards: [],
      resetting: false,
      showDeck: true,
      showForgetIndex: -1,
      showGGDialog: '',
      showHomeAlert: false,
      showReplayAlert: false
    }
  }

  componentDidMount = () => {
    this.props.getQuestionAsync()
  }

  componentWillUnmount = () => {
    this.props.resetQuestion()
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.question.loyal !== nextProps.question.loyal) {
      const persistPhoto = this.state.cards.reduce((res, card) => res && !!card.src, true)
      this.initialCards(nextProps, persistPhoto)
    }
  }

  render = () => {
    const { query, question } = this.props
    const { cards, resetting, showDeck, showForgetIndex, showGGDialog, showHomeAlert, showReplayAlert } = this.state

    if (!cards.length || resetting) return null

    return (
      <Container onClick={e => e.preventDefault()}>
        <Header>
          <HeaderButtonContainer onClick={this.toggleHomeAlert}>
            <HeaderButton src='/img/home.svg'/>
          </HeaderButtonContainer>
          <HeaderButtonContainer onClick={this.toggleReplayAlert}>
            <HeaderButton src='/img/refresh.svg'/>
          </HeaderButtonContainer>
        </Header>
        <PlayerGallery
          cards={cards}
          query={query}
          question={question}
          showFooter={!showDeck}
          showGGDialog={showGGDialog}
          onExecute={this.handleExecute}
          onForget={this.handleForget}
          onReplay={this.handleReplay}/>
        <Deck
          ref={ref => { this.deckRef = ref }}
          cards={cards}
          showDeck={showDeck}
          showForgetIndex={showForgetIndex}
          onForgetContainerClick={this.handleForgetContainerClick}
          onShot={this.handleShot}/>
        <Alert
          show={showHomeAlert}
          title={locale('game.alert.homeTitle')}
          onCancel={this.toggleHomeAlert}
          onConfirm={() => location.href = '/'}/>
        <Alert
          show={showReplayAlert}
          title={locale('game.alert.replayTitle')}
          onCancel={this.toggleReplayAlert}
          onConfirm={this.handleReplay}/>
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
    this.deckRef && this.deckRef.closeCamera()

    this.setState({
      resetting: true,
      showDeck: true,
      showForgetIndex: -1,
      showGGDialog: '',
      showHomeAlert: false,
      showReplayAlert: false
    }, async () => {
      await this.props.getQuestionAsync({ prevLoyal: this.props.question.loyal })
      this.setState({ resetting: false })
    })
  }

  toggleHomeAlert = () => {
    this.setState({ showHomeAlert: !this.state.showHomeAlert })
  }

  toggleReplayAlert = () => {
    this.setState({ showReplayAlert: !this.state.showReplayAlert })
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
