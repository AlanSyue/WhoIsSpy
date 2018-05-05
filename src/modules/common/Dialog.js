import PropTypes from 'prop-types'
import styled from 'styled-components'

const cardBorderWidth = 4
const cardWidth = '45vw'

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
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
const Body = styled.div`
  transform: translate(-50%, -50%);
`

export default class Dialog extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.element.isRequired,
    show: PropTypes.bool,
    onClose: PropTypes.func
  }

  static defaultProps = {
    show: true
  }

  render = () => {
    const { className, children, show, onClose } = this.props

    return (
      <Container className={className} show={show} onClick={onClose}>
        <Wrapper onClick={this.handleWrapperClick}>
          <Body>
            {children}
          </Body>
        </Wrapper>
      </Container>
    )
  }

  handleWrapperClick = e => {
    e.preventDefault()
  }
}
