import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from '~/constants/theme'

const Container = styled.label`
  position: relative;
  display: inline-block;
`
const Checkbox = styled.input`
  opacity: 0;

  :checked + span {
    background-color: ${theme.widgetActive};
  }

  :checked + span > span {
    min-width: calc(100% - ${props => props.border * 2}px);
  }

`
const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.widget};
  border-radius: 100vw;
  transition: .4s;
`
const RockerContainer = styled.span`
  position: absolute;
  height: calc(100% - ${props => props.border * 2}px);
  left: ${props => props.border}px;
  bottom: ${props => props.border}px;
  transition: .4s;
  min-width: ${props => props.width}px;
  user-select: none;
`
const Rocker = styled.img`
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  background-color: #FFFFFF;
  border-radius: 100%;
  transition: .4s;
  user-select: none;
`
const RockerShim = Rocker.extend`
  position: relative;
  opacity: 0;
`

export default class Switch extends React.Component {
  static propTypes = {
    border: PropTypes.number.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    border: 4,
    value: false,
    onChange: noop
  }

  constructor (props) {
    super(props)

    this.state = {
      width: null
    }

    this.transparentSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }

  render = () => {
    const { border, className, value, onChange } = this.props
    const { width } = this.state

    return (
      <Container className={className}>
        <Checkbox type='checkbox' border={border} checked={value} onChange={this.handleChange}/>
        <Slider>
          <RockerContainer border={border} width={width}>
            <RockerShim src={this.transparentSrc}/>
            <Rocker innerRef={ref => {
              if (!ref) return
              if (this.state.width === null) this.setState({ width: ref.clientWidth })
            }} src={this.transparentSrc}/>
          </RockerContainer>
        </Slider>
      </Container>
    )
  }

  handleChange = e => {
    const { onChange } = this.props

    onChange(e.target.checked)
  }
}
