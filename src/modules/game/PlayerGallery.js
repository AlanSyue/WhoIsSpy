import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '~/modules/common/Button'

import locale from '~/constants/locale'
import theme from '~/constants/theme'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`
const Gallery = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.numberOfColumns}, 1fr);
`
const Footer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const FooterButton = styled(Button)`
  padding: 16px 32px;

  :first-child {
    margin-right: 40px;
  }
`
const PlayerContainer = styled.div`
  padding-bottom: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`
const PlayerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: ${props => props.selected ? 1 : 0.2};
  transition: opacity .3s cubic-bezier(.4, 0, .2, 1);
`
const PlayerPhoto = styled.img`
  height: 101%;
  width: 101%;
  cursor: ${props => props.disable ? 'default' : 'pointer'};
`
const PlayerNumber = styled.div`
  background-color: ${theme.primary};
  position: absolute;
  left: 5%;
  top: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  width: 26px;
  color: white;
  font-size: 14px;
  line-height: 1;
  border-radius: 100vh;
  opacity: 0.9;
  pointer-events: none;
`
const PlayerRevealType = PlayerNumber.extend`
  background-color: ${props => theme[props.type]};
  color: ${props => theme[props.type === 'whiteboard' ? 'textDark' : 'textPrimary']};
  left: auto;
  right: 5%;
  width: auto;
  padding: 0 10px;
`

export default class PlayerGallery extends React.Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    showFooter: PropTypes.bool,
    onExecute: PropTypes.func,
    onForget: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      selectedIndex: -1
    }
  }

  render = () => {
    const { cards, showFooter, onExecute, onForget } = this.props
    const { selectedIndex } = this.state
    const numberOfColumns = 2 + Math.ceil((cards.length - 4) / 8)
    const disableButton = selectedIndex === -1

    return (
      <Container onClick={this.handleContainerClick}>
        <Gallery numberOfColumns={numberOfColumns}>
          {cards.map(this.renderPlayer)}
        </Gallery>
        {showFooter && (
          <Footer>
            <FooterButton disable={disableButton} onClick={onExecute(selectedIndex)}>
              {locale('game.execute')}
            </FooterButton>
            <FooterButton disable={disableButton} onClick={onForget(selectedIndex)}>
              {locale('game.forget')}
            </FooterButton>
          </Footer>
        )}
      </Container>
    )
  }

  renderPlayer = ({ revealed, src, type }, index) => {
    const { selectedIndex } = this.state
    const selected = (index === selectedIndex || selectedIndex === -1) && !revealed

    return (
      <PlayerContainer key={index}>
        {src && (
          <PlayerWrapper selected={selected}>
            <PlayerPhoto src={src} disable={revealed} onClick={revealed ? noop : this.handlePlayerClick(index)}/>
            <PlayerNumber>
              {index + 1}
            </PlayerNumber>
          </PlayerWrapper>
        )}
        {revealed && (
          <PlayerRevealType type={type}>
            {locale(`game.${type}`)}
          </PlayerRevealType>
        )}
      </PlayerContainer>
    )
  }

  handleContainerClick = e => {
    const { selectedIndex } = this.state

    if (selectedIndex !== -1) {
      this.setState({ selectedIndex: -1 })
    }
  }

  handlePlayerClick = index => e => {
    this.setState({ selectedIndex: index })
  }
}
