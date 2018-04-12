import PropTypes from 'prop-types'
import range from 'lodash/range'
import styled from 'styled-components'

import theme from '~/constants/theme'

const height = 20;

const Container = styled.div`
  height: ${height}px;
  width: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Item = styled.div`
  background-color: ${props => props.color};
  flex: 1;
  height: 100%;
  margin-right: 2px;

  :first-child {
    border-top-left-radius: ${height / 2}px;
    border-bottom-left-radius: ${height / 2}px;
  }

  :last-child {
    border-top-right-radius: ${height / 2}px;
    border-bottom-right-radius: ${height / 2}px;
    margin-right: 0;
  }
`

export default class MenuPlayerChart extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    player: PropTypes.number.isRequired,
    spy: PropTypes.number.isRequired,
    whiteboard: PropTypes.number.isRequired
  }

  render = () => {
    const { className, player, spy, whiteboard } = this.props
    const loyal = player - spy - whiteboard

    return (
      <Container className={className}>
        {range(loyal).map(i => <Item color={theme.loyal} key={i}/>)}
        {range(spy).map(i => <Item color={theme.spy} key={i + loyal}/>)}
        {range(whiteboard).map(i => <Item color={theme.whiteboard} key={i + loyal + spy}/>)}
      </Container>
    )
  }
}
