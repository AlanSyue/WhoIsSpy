import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '~/modules/common/Button'
import CameraView from './CameraView'

import locale from '~/constants/locale'
import size from '~/constants/size'
import theme from '~/constants/theme'

const Container = styled.div`
  background-color: ${theme.dark};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  opacity: ${props => props.show ? 1 : 0};
  pointer-events: ${props => props.show ? 'all' : 'none'};
  transition: opacity .3s cubic-bezier(.4, 0, .2, 1);
`
const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`
const CardContainer = styled.div.attrs({
  style: props => ({
    transform: `translateX(calc((${
      Math.min(
        size.maxWindowSize * size.cardWidthRatio / 100,
        window.innerWidth * size.cardWidthRatio / 100
      )
    }px - 10px) * ${props.shift}))`
  })
})`
  position: absolute;
  transition: transform .3s cubic-bezier(.4, 0, .2, 1);
`
const CardWrapper = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  position: relative;
  background-color: ${theme.accent};
  border: ${size.cardBorderWidth}px solid white;
  border-radius: 17px;
  padding-bottom: 140%;
  width: ${Math.min(
    size.maxWindowSize * size.cardWidthRatio / 100,
    typeof window !== 'undefined' && window.innerWidth * size.cardWidthRatio / 100
  )}px;
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
  opacity: ${props => props.show ? 1 : 0};
  pointer-events: ${props => props.show ? 'inherit' : 'none'};
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
const DrawnCardFooter = styled.div`
  position: absolute;
  top: calc(100% + 30px);
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
`
const FooterButton = styled(Button)`
  padding: 20px 0;
  line-height: 1;
  user-select: none;
  max-width: 60%;
  flex: 1;
`
const ForgetCardContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`
const ForgetCardWrapper = CardWrapper.extend`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: calc(${Math.min(
    size.maxWindowSize * size.cardWidthRatio / 100,
    typeof window !== 'undefined' && window.innerWidth * size.cardWidthRatio / 100
  )}px * 1.5);
  transform: none;
  cursor: default;
  overflow: visible;
`
const ForgetCardPhotoContainer = styled.div`
  padding: 10% 10% 0 10%;
`
const ForgetCardPhoto = styled.img`
  border: 3px solid white;
  border-radius: 15px;
  overflow: hidden;
  width: 100%;
`

export default class Deck extends React.Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    showDeck: PropTypes.bool,
    showForgetIndex: PropTypes.number,
    onShot: PropTypes.func.isRequired
  }

  static defaultProps = {
    cards: []
  }

  constructor (props) {
    super(props)

    this.cardsRef = []
    this.cameraView = null

    this.persistPhoto = props.cards.reduce((res, card) => res && !!card.src, true)

    this.state = {
      cardsDrawn: 0,
      drawnCardDim: {},
      showDrawnCardContent: false
    }
  }

  componentDidMount = () => {
    // https://stackoverflow.com/questions/46228218/how-to-access-camera-on-ios11-home-screen-web-app
    // navigator.getUserMedia does not work in PWA with <meta name='apple-mobile-web-app-capable' content='yes'/>
    window.navigator.getUserMedia = navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      if (this.persistPhoto) return

      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.stream = stream

        // forceUpdate to get DrawnCardBody CameraView ref
        this.forceUpdate()
      }).catch(e => {
        alert(locale('game.alert.cameraError') + '\n' + e)
        console.log(e)
        location.href = '/'
      })
    } else {
      alert('game.alert.browserNotSupportCameraError')
      location.href = '/'
    }
  }

  render = () => {
    const { cards, showDeck, showForgetIndex } = this.props
    const { cardsDrawn } = this.state
    const showForget = showForgetIndex !== -1

    return (
      <Container show={showDeck || showForget}>
        {showDeck && (
          <React.Fragment>
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
          </React.Fragment>
        )}
        {showForget && this.renderForgetCard(cards[showForgetIndex])}
      </Container>
    )
  }

  renderDrawnCard = () => {
    const { cards } = this.props
    const { cardsDrawn, drawnCardDim, showDrawnCardContent } = this.state
    const card = cards[cardsDrawn - 1] || {}

    return (
      <DrawnCard drawnCardDim={drawnCardDim}>
        {(this.persistPhoto || this.stream) && (
          <React.Fragment>
            <DrawnCardBody show={showDrawnCardContent}>
              <CameraView
                ref={ref => { this.cameraView = ref }}
                src={card.src}
                stream={this.stream}
                onShot={this.handleShot}/>
              <DrawnCardContent>
                {card.question || locale('game.whiteboard')}
              </DrawnCardContent>
            </DrawnCardBody>
            {showDrawnCardContent &&
              <DrawnCardFooter>
                <FooterButton onClick={this.handleConfirmButtonClick}>
                  {locale('game.confirmCard')}
                </FooterButton>
              </DrawnCardFooter>
            }
          </React.Fragment>
        )}
      </DrawnCard>
    )
  }

  renderForgetCard = card => (
    <ForgetCardContainer>
      <ForgetCardWrapper>
        <CardBody>
          <DrawnCardBody show>
            <ForgetCardPhotoContainer>
              <ForgetCardPhoto src={card.src}/>
            </ForgetCardPhotoContainer>
            <DrawnCardContent>
              {card.question || locale('game.whiteboard')}
            </DrawnCardContent>
          </DrawnCardBody>
        </CardBody>
      </ForgetCardWrapper>
    </ForgetCardContainer>
  )

  handleCardClick = e => {
    const { cardsDrawn, drawnCardDim } = this.state

    if (drawnCardDim.height || !this.cameraView) return

    const rect = this.cardsRef[this.cardsRef.length - cardsDrawn - 1].getBoundingClientRect()
    const offset = Math.max(window.innerWidth - size.maxWindowSize, 0) / 2

    this.setState({
      drawnCardDim: {
        elevate: false
      },
      showDrawnCardContent: false
    }, () => requestAnimationFrame(() => {
      this.setState({
        cardsDrawn: this.state.cardsDrawn + 1,
        drawnCardDim: {
          height: rect.height + size.cardBorderWidth * 2,
          width: rect.width + size.cardBorderWidth * 2,
          top: rect.top - size.cardBorderWidth,
          left: rect.left - size.cardBorderWidth - offset
        }
      }, () => requestAnimationFrame(() => {
        const newDim = this.state.drawnCardDim
        const height = newDim.height * 1.5
        const width = newDim.width * 1.5
        const top = (window.innerHeight - height - 82 + 50) / 2
        const left = (window.innerWidth - width) / 2 - offset

        this.setState({
          drawnCardDim: {
            height,
            width,
            top,
            left,
            elevate: true
          }
        })

        setTimeout(() => requestAnimationFrame(async () => {
          await this.cameraView.playStream()
          this.setState({ showDrawnCardContent: true })
        }), 500)
      }))
    }))
  }

  handleConfirmButtonClick = e => {
    const { cards } = this.props
    const { cardsDrawn } = this.state
    const isLastShot = cardsDrawn >= cards.length
    const card = cards[cardsDrawn - 1] || {}

    if (card.src) {
      this.handleShot(card.src)
    } else {
      this.cameraView.shot()
    }

    if (isLastShot) this.closeCamera()
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

  closeCamera = () => {
    this.stream && this.stream.getTracks()[0].stop()
  }
}
