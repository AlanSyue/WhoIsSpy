import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '~/modules/common/Button'
import Dialog from '~/modules/common/Dialog'

import locale from '~/constants/locale'
import theme from '~/constants/theme'

const Container = styled.div`
  padding: 10px;
`
const Title = styled.div`
  color: ${theme.textPrimary};
  font-size: 24px;
  text-align: center;
`
const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
const FooterButton = styled(Button)`
  padding: 16px 20px;

  :first-child {
    margin-right: 20px;
  }
`

export default class Alert extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
  }

  render = () => {
    const { show, title, onCancel, onConfirm } = this.props

    return (
      <Dialog show={show}>
        <Container>
          <Title>
            {title}
          </Title>
          <Footer>
            <FooterButton onClick={onCancel}>
              {locale('game.alert.cancel')}
            </FooterButton>
            <FooterButton onClick={onConfirm}>
              {locale('game.alert.confirm')}
            </FooterButton>
          </Footer>
        </Container>
      </Dialog>
    )
  }
}
