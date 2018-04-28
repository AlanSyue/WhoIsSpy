import PropTypes from 'prop-types'
import styled from 'styled-components'

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
  height: 100px;
`

export default class CameraView extends React.Component {
  static propTypes = {
    onShot: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.video = null
  }

  componentDidMount = () => {
    if (this.video && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.srcObject = stream
        this.video.play()
      }).catch(err => {
        alert(err)
      })
    }
  }

  render = () => {
    return (
      <Container>
        <Wrapper>
          <Body>
            <Video innerRef={ref => { this.video = ref }} autoplay/>
          </Body>
        </Wrapper>
        <Img innerRef={ref => { this.img = ref }}/>
      </Container>
    )
  }

  confirm = () => {
    const { onShot } = this.props
    const canvas = document.createElement('canvas')

    const vw = this.video.videoWidth
    const vh = this.video.videoHeight
    const imgSize = Math.min(vw, vh)
    const left = (vw - imgSize) / 2
    const top = (vh - imgSize) / 2

    canvas.width = imgSize
    canvas.height = imgSize

    const ctx = canvas.getContext('2d')

    ctx.drawImage(this.video, left, top, imgSize, imgSize, 0, 0, imgSize, imgSize)

    const src = canvas.toDataURL('image/jpg')

    onShot(src)
  }
}
