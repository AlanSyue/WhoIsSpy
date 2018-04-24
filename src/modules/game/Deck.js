import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from '~/constants/theme'

const cardWidth = '45vw'

const Container = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
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
  border: 3px solid white;
  border-radius: 17px;
  padding-bottom: 140%;
  width: ${cardWidth};
  transform: translate(-50%, -50%);
  overflow: hidden;
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

export default class Deck extends React.Component {
  static propTypes = {
    cards: PropTypes.array.isRequired
  }

  static defaultProps = {
    cards: []
  }

  constructor (props) {
    super(props)

    this.state = {
      cardsDrawn: 0
    }
  }

  render = () => {
    const { cards } = this.props
    const { cardsDrawn } = this.state

    return (
      <Container>
        <Wrapper>
          {cards.slice(0, cards.length - cardsDrawn).map((card, index, array) => (
            <CardContainer key={index} shift={(index / (array.length - 1) - 0.5) || 0}>
              <CardWrapper>
                <CardBody onClick={this.handleCardClick}>
                  {card.type} {card.question}
                </CardBody>
              </CardWrapper>
            </CardContainer>
          ))}
        </Wrapper>
      </Container>
    )
  }

  handleCardClick = e => {
    this.setState({ cardsDrawn: this.state.cardsDrawn + 1 })
  }
}
