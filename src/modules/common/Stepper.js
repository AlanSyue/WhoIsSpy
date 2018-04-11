import clamp from 'lodash/clamp'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
const Button = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  height: 100%;
  flex: 1;
  color: #FFFFFF;
  font-size: 1em;
  cursor: pointer;
  transition: .4s;

  :active {
    background-color: ${theme.widgetActive};
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
    const { className, value, onChange } = this.props
    const { width } = this.state

    return (
      <Container className={className}>
        <Wrapper>
          <Button onClick={this.handleChange(-1)}>-</Button>
          <Button onClick={this.handleChange(+1)}>+</Button>
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
