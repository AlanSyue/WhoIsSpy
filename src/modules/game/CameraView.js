import PropTypes from 'prop-types'
import styled from 'styled-components'

import { MAX_IMAGE_SIZE } from '~/constants/common'

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 10% 10% 0 10%;
`
const Wrapper = styled.div`
  position: relative;
  padding-bottom: 100%;
  width: 100%;
`
const Body = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: gray;
  border: 3px solid white;
  border-radius: 15px;
  overflow: hidden;
`
const Video = styled.video`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
`
const Img = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
`

export default class CameraView extends React.Component {
  static propTypes = {
    src: PropTypes.string,
    stream: PropTypes.object,
    onShot: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.video = null
  }

  componentDidMount = () => {
    if (this.video) {
      this.video.srcObject = this.props.stream
      this.video.play()
    }
  }

  render = () => {
    const { src } = this.props

    return (
      <Container>
        <Wrapper>
          <Body>
            {src
              ? <Img src={src}/>
              : <Video innerRef={ref => { this.video = ref }} autoplay/>
            }
          </Body>
        </Wrapper>
      </Container>
    )
  }

  shot = () => {
    if (!this.video || !this.video.srcObject) return

    const { onShot } = this.props
    const canvas = document.createElement('canvas')

    const vw = this.video.videoWidth
    const vh = this.video.videoHeight
    const imgSize = Math.min(vw, vh)
    const left = (vw - imgSize) / 2
    const top = (vh - imgSize) / 2
    const canvasSize = Math.min(imgSize, MAX_IMAGE_SIZE)

    canvas.width = canvasSize
    canvas.height = canvasSize

    const ctx = canvas.getContext('2d')

    ctx.drawImage(this.video, left, top, imgSize, imgSize, 0, 0, canvasSize, canvasSize)

    const src = canvas.toDataURL('image/jpg')

    onShot(src)
  }
}
