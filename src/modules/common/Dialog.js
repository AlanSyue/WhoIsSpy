import PropTypes from 'prop-types'
import styled from 'styled-components'

import size from '~/constants/size'
import theme from '~/constants/theme'

const Container = styled.div`
  background-color: ${props => props.solid ? theme.dark : 'rgba(0, 0, 0, 0.75)'};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  opacity: ${props => props.show ? 1 : 0};
  pointer-events: ${props => props.show ? 'all' : 'none'};
  transition: opacity .3s cubic-bezier(.4, 0, .2, 1);
  z-index: 1;
`
const Wrapper = styled.div`
  position: absolute;
  top: calc((100% + ${size.headerHeight}) / 2);
  left: 50%;
`
const Body = styled.div`
  transform: translate(-50%, -50%);
  box-shadow: ${props => !props.solid && '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)'};
  background-color: ${props => props.solid ? theme.dark : theme.primary};
  border-radius: 10px;
  padding: 20px;
  width: 90vw;
  max-width: ${size.maxWindowSize}px;
`

export default class Dialog extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.element ]).isRequired,
    show: PropTypes.bool,
    solid: PropTypes.bool,
    onClose: PropTypes.func
  }

  static defaultProps = {
    show: true
  }

  render = () => {
    const { className, children, show, solid, onClose } = this.props

    return (
      <Container className={className} show={show} solid={solid} onClick={onClose}>
        <Wrapper onClick={this.handleWrapperClick}>
          <Body solid={solid}>
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
