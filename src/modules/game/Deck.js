import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '~/modules/common/Button'
import CameraView from './CameraView'

import locale from '~/constants/locale'
import theme from '~/constants/theme'

const cardBorderWidth = 4
const cardWidth = '45vw'

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
`
const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`
const CardContainer = styled.div.attrs({
  style: props => ({
    transform: `translateX(calc((${cardWidth} - 10px) * ${props.shift}))`
  })
})`
  position: absolute;
  transition: transform .3s cubic-bezier(.4, 0, .2, 1);
`
const CardWrapper = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  position: relative;
  background-color: ${theme.accent};
  border: ${cardBorderWidth}px solid white;
  border-radius: 17px;
  padding-bottom: 140%;
  width: ${cardWidth};
  transform: translate(-50%, -50%);
  overflow: hidden;
  cursor: pointer;
`
const CardBody = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const DrawnCard = CardWrapper.extend.attrs({
  style: ({ drawnCardDim }) => ({
    height: `${drawnCardDim.height}px`,
    width: `${drawnCardDim.width}px`,
    left: `${drawnCardDim.left}px`,
    top: `${drawnCardDim.top}px`
  })
})`
  display: ${props => props.drawnCardDim.height ? 'block' : 'none'};
  box-shadow: ${props => props.drawnCardDim.height && '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)'};
  position: absolute;
  padding-bottom: 0;
  transform: none;
  cursor: default;
  transition: ${props => props.drawnCardDim.elevate && 'all .5s cubic-bezier(.4, 0, .2, 1)'};
  overflow: visible;
`
const DrawnCardBody = styled.div`
  background-color: ${theme.cardForeground};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: visible;
  border-radius: 13px;
`
const DrawnCardContent = styled.div`
  color: ${theme.textDark};
  font-size: 40px;
  font-weight: bold;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ConfirmButton = styled(Button)`
  position: absolute;
  top: calc(100% + 30px);
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 20px;
`
const ButtonContent = styled.p`
  font-size: 20px;
  line-height: 1;
  user-select: none;
`

export default class Deck extends React.Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    onShot: PropTypes.func.isRequired
  }

  static defaultProps = {
    cards: []
  }

  constructor (props) {
    super(props)

    this.cardsRef = []
    this.cameraView = null

    this.state = {
      cardsDrawn: 0,
      drawnCardDim: {},
      showDrawnCardContent: false
    }
  }

  componentDidMount = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.stream = stream
      }).catch(e => {
        console.log(e)
      })
    }
  }

  render = () => {
    const { cards } = this.props
    const { cardsDrawn } = this.state

    return (
      <Container>
        <Wrapper>
          {cards.slice(cardsDrawn, cards.length).reverse().map((card, index, array) => (
            <CardContainer
              key={index}
              shift={(index / (array.length - 1) - 0.5) || 0}>
              <CardWrapper>
                <CardBody
                  innerRef={ref => { this.cardsRef[index] = ref }}
                  onClick={this.handleCardClick}/>
              </CardWrapper>
            </CardContainer>
          ))}
        </Wrapper>
        {this.renderDrawnCard()}
      </Container>
    )
  }

  renderDrawnCard = () => {
    const { cards } = this.props
    const { cardsDrawn, drawnCardDim, showDrawnCardContent } = this.state
    const card = cards[cardsDrawn - 1] || {}

    return (
      <DrawnCard drawnCardDim={drawnCardDim}>
        {this.stream && showDrawnCardContent && (
          <React.Fragment>
            <DrawnCardBody>
              <CameraView
                ref={ref => { this.cameraView = ref }}
                stream={this.stream}
                onShot={this.handleShot}/>
              <DrawnCardContent>
                {card.question || locale('game.whiteboard')}
              </DrawnCardContent>
            </DrawnCardBody>
            <ConfirmButton>
              <ButtonContent onClick={this.handleConfirmButtonClick}>
                {locale('game.confirmCard')}
              </ButtonContent>
            </ConfirmButton>
          </React.Fragment>
        )}
      </DrawnCard>
    )
  }

  handleCardClick = e => {
    const { cardsDrawn, drawnCardDim } = this.state

    if (drawnCardDim.height) return

    const rect = this.cardsRef[this.cardsRef.length - cardsDrawn - 1].getBoundingClientRect()

    this.setState({
      drawnCardDim: {
        elevate: false
      },
      showDrawnCardContent: false
    }, () => requestAnimationFrame(() => {
      this.setState({
        cardsDrawn: this.state.cardsDrawn + 1,
        drawnCardDim: {
          height: rect.height + cardBorderWidth * 2,
          width: rect.width + cardBorderWidth * 2,
          top: rect.top - cardBorderWidth,
          left: rect.left - cardBorderWidth
        }
      }, () => requestAnimationFrame(() => {
        const newDim = this.state.drawnCardDim
        const height = newDim.height * 1.5
        const width = newDim.width * 1.5
        const top = (window.innerHeight - height) / 2
        const left = (window.innerWidth - width) / 2

        this.setState({
          drawnCardDim: {
            height,
            width,
            top,
            left,
            elevate: true
          }
        })

        setTimeout(() => requestAnimationFrame(() => this.setState({ showDrawnCardContent: true })), 500)
      }))
    }))
  }

  handleConfirmButtonClick = e => {
    const { cards } = this.props
    const { cardsDrawn } = this.state
    const isLastShot = cardsDrawn >= cards.length

    this.cameraView.shot()

    if (isLastShot) this.stream.getTracks()[0].stop()
  }

  handleShot = dataUrl => {
    const { onShot } = this.props
    const { cardsDrawn } = this.state

    onShot({
      dataUrl,
      index: cardsDrawn - 1
    })

    this.setState({
      drawnCardDim: {
        elevate: false
      },
      showDrawnCardContent: false
    })
  }
}
