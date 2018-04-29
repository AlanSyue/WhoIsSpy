import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.numberOfColumns}, 1fr);
  grid-gap: 8px;
`
const PlayerContainer = styled.div`
  padding-bottom: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`
const PlayerPhoto = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

export default class PlayerGallery extends React.Component {
  static propTypes = {
    cards: PropTypes.array.isRequired
  }

  render = () => {
    const { cards } = this.props
    const numberOfColumns = 2 + Math.ceil((cards.length - 4) / 8)

    return (
      <Container numberOfColumns={numberOfColumns}>
        {cards.map(this.renderPlayer)}
      </Container>
    )
  }

  renderPlayer = ({ src }, index) => {
    return (
      <PlayerContainer key={index}>
        {src && <PlayerPhoto src={src}/>}
      </PlayerContainer>
    )
  }
}
