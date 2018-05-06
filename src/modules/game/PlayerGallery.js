import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '~/modules/common/Button'
import Dialog from '~/modules/common/Dialog'

import locale from '~/constants/locale'
import size from '~/constants/size'
import theme from '~/constants/theme'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const GalleryContainer = styled.div`
`
const Gallery = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.numberOfColumns}, 1fr);
  margin: auto;
`
const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin-top: 20px;
`
const FooterButton = styled(Button)`
  flex: 1;
  margin-right: 20px;
  padding: 20px 0;
  max-width: 60%;

  :last-child {
    margin-right: 0;
  }
`
const PlayerContainer = styled.div`
  width: 100%;
`
const PlayerWrapper = styled.div`
  padding-bottom: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`
const PlayerBody = styled.div`
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
  border-radius: 100%;
  opacity: 0.9;
  pointer-events: none;
`
const PlayerRevealType = PlayerNumber.extend`
  background-color: ${props => theme[props.type]};
  color: ${props => theme[props.type === 'whiteboard' ? 'textDark' : 'textPrimary']};
  left: auto;
  right: 5%;
  border-radius: 100vh;
  width: auto;
  padding: 0 10px;
`
const GGContainer = styled.div`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-color: ${theme.primary};
  border-radius: 10px;
  padding: 20px;
  width: 90vw;
  max-width: ${size.maxWindowSize}px;
`
const GGTitle = styled.p`
  color: ${theme.accent};
  font-size: 50px;
  font-weight: bold;
  text-align: center;
`
const GGSubTitle = styled.div`
  color: ${theme.textPrimary};
  font-size: 20px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
const GGVS = styled.div`
  margin: 0 10px;
`
const GGGallery = Gallery.extend`
  margin-top: 20px;
  max-width: ${props => props.numberOfColumns === 1 && '70%'};
`
const GGFooter = Footer.extend`
  margin-top: 30px;
`

export default class PlayerGallery extends React.Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    query: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    showFooter: PropTypes.bool,
    showGGDialog: PropTypes.string,
    onExecute: PropTypes.func,
    onForget: PropTypes.func,
    onReplay: PropTypes.func
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
    const numberOfColumns = cards.length >= 10 ? 4 : cards.length >= 5 ? 3 : 2
    const disableButton = selectedIndex === -1

    return (
      <Container onClick={this.handleContainerClick}>
        <GalleryContainer>
          <Gallery numberOfColumns={numberOfColumns}>
            {cards.map(this.renderPlayer)}
          </Gallery>
        </GalleryContainer>
        {showFooter && (
          <Footer>
            <FooterButton disable={disableButton} onClick={onForget(selectedIndex)}>
              {locale('game.forget')}
            </FooterButton>
            <FooterButton disable={disableButton} theme='danger' onClick={onExecute(selectedIndex)}>
              {locale('game.execute')}
            </FooterButton>
          </Footer>
        )}
        {this.renderGGDialog()}
      </Container>
    )
  }

  renderPlayer = ({ drawn, revealed, src, type }, index, highlight) => {
    const { selectedIndex } = this.state
    const selected = (index === selectedIndex || selectedIndex === -1) && !revealed || highlight === true

    if (!drawn) return null

    return (
      <PlayerContainer key={index}>
        <PlayerWrapper>
          {src && (
            <PlayerBody selected={selected}>
              <PlayerPhoto src={src} disable={revealed} onClick={revealed ? noop : this.handlePlayerClick(index)}/>
              <PlayerNumber>
                {index + 1}
              </PlayerNumber>
            </PlayerBody>
          )}
          {revealed && (
            <PlayerRevealType type={type}>
              {locale(`game.${type}`)}
            </PlayerRevealType>
          )}
        </PlayerWrapper>
      </PlayerContainer>
    )
  }

  renderGGDialog = () => {
    const { cards, query, question, showGGDialog, onReplay } = this.props
    const notLoyal = query.spy + query.whiteboard

    return (
      <Dialog show={!!showGGDialog} solid>
        <GGTitle>
          {locale(`game.${showGGDialog}`) + locale('game.win')}
        </GGTitle>
        <GGSubTitle>
          {question.loyal}
          <GGVS>
            VS
          </GGVS>
          {question.spy}
        </GGSubTitle>
        <GGGallery numberOfColumns={notLoyal >= 5 ? 3 : notLoyal >= 2 ? 2 : 1}>
          {cards.map((card, index) => [ 'spy', 'whiteboard' ].includes(card.type) && (
            this.renderPlayer({
              ...card,
              revealed: true
            }, index, true)
          ))}
        </GGGallery>
        <GGFooter>
          <FooterButton onClick={onReplay}>
            {locale('game.replay')}
          </FooterButton>
        </GGFooter>
      </Dialog>
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
