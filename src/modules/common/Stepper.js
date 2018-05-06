import clamp from 'lodash/clamp'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import theme from '~/constants/theme'

const Container = styled.div`
  position: relative;
  display: inline-block;
`
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.widget};
  border-radius: 100vw;
  transition: .4s;
  display: flex;
  overflow: hidden;
`
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
  color: #FFFFFF;
  transition: .4s;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  opacity: ${props => props.disabled ? 0.1 : 1};

  :active {
    background-color: ${theme.widgetActive};
  }
`
const Bar = css`
  background-color: ${theme.textPrimary};
  position: relative;
  height: 30%;
  width: 2px;
`
const Minus = styled.div`
  ${Bar};
  transform: rotateZ(90deg);
`
const Cross = styled.div`
  ${Bar};

  :after {
    content: '';
    top: 0;
    left: 0;
    ${Bar};
    height: 100%;
    position: absolute;
    transform: rotateZ(90deg);
  }
`

export default class Stepper extends React.Component {
  static propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    value: 0,
    onChange: noop
  }

  constructor (props) {
    super(props)

    this.state = {
      width: null
    }

    this.transparentSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }

  componentWillReceiveProps = nextProps => {
    const { max, min } = this.props

    if (max !== nextProps.max || min !== nextProps.min) {
      this.change({
        max: nextProps.max,
        min: nextProps.min,
        value: nextProps.value
      })
    }
  }

  render = () => {
    const { className, max, min, value, onChange } = this.props
    const { width } = this.state

    return (
      <Container className={className}>
        <Wrapper>
          <Button disabled={value <= min} onClick={this.handleChange(-1)}>
            <Minus/>
          </Button>
          <Button disabled={value >= max} onClick={this.handleChange(+1)}>
            <Cross/>
          </Button>
        </Wrapper>
      </Container>
    )
  }

  handleChange = offset => () => {
    const { max, min, value } = this.props

    this.change({ offset, max, min, value })
  }

  change = ({ offset = 0, max, min, value }) => {
    const { onChange } = this.props

    onChange(clamp(value + offset, min, max))
  }
}
