import styled, { css } from 'styled-components'

import Alert from '~/modules/common/Alert'
import Button from '~/modules/common/Button'
import MenuPlayerChart from './MenuPlayerChart'
import Stepper from '~/modules/common/Stepper'
import Switch from '~/modules/common/Switch'

import locale from '~/constants/locale'
import theme from '~/constants/theme'

import {
  MAX_PLAYER,
  MIN_PLAYER
} from '~/constants/common'

const flex = css`
  display: flex;
  align-items: center;
`
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Icon = styled.img`
  height: 160px;
  margin-bottom: -40px;
`
const Title = styled.h1`
  font-size: 50px;
  font-weight: bold;
  margin: 0;
  color: ${theme.accent};
  user-select: none;
`
const Section = styled.section`
  margin: 6px 0;
`
const P = styled.p`
  font-size: 20px;
  color: ${theme.textPrimary};
  line-height: 1;
  user-select: none;
`
const Count = P.extend`
  margin-left: 10px;
  width: 24px;
  text-align: center;
`
const ButtonContent = P.extend`
  font-size: 24px;
`
const Flex = styled.div`${flex}`
const Label = styled.label`
  ${flex}
  cursor: pointer;
`
const StyledMenuPlayerChart = styled(MenuPlayerChart)`
  margin-bottom: 10px;
`
const StyledStepper = styled(Stepper)`
  width: 80px;
  height: 40px;
  margin-left: 10px;
`
const StyledSwitch = styled(Switch)`
  width: 80px;
  height: 40px;
  margin-left: 10px;
`
const SubmitButton = styled(Button)`
  display: block;
  padding: 16px 20px;
  margin-top: 10px;
`
const SubmitButtonNoPadding = SubmitButton.extend`
  padding: 0;
  margin-left: 16px;
`
const RuleContainer = styled.div`
  color: ${theme.textPrimary};
  font-size: 14px;
  max-height: 50vh;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }

  ol {
    margin-right: 5px;
  }

  li {
    margin: 5px 0;
  }
`
const ButtonIcon = styled.img`
  display: block;
  height: 56px;
  width: 56px;
  padding: 12px;
`

export default class MenuPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      player: 4,
      spy: 1,
      whiteboard: false,
      showRuleAlert: false
    }
  }

  componentDidMount = () => {
    if (global.sendPageview) global.sendPageview()

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
          // Registration successful
        }, err => {
          // Registration failed
        })
      })
    }

    window.addEventListener('beforeinstallprompt', e => {
      e.userChoice.then(choiceResult => {
        if (choiceResult.outcome == 'dismissed') {
          // User cancelled home screen install
        } else {
          // User added to home screen
        }
      })
    })
  }

  render = () => {
    const { player, spy, whiteboard, showRuleAlert } = this.state
    const maxSpy = Math.ceil(player / 4) - whiteboard

    return (
      <Container onClick={e => e.preventDefault()}>
        <Icon src='/img/spy.svg'/>
        <Title>{locale('menu.title')}</Title>
        <Section>
          <StyledMenuPlayerChart
            player={player}
            spy={spy}
            whiteboard={+whiteboard}/>
        </Section>
        <Section>
          <Flex>
            <P>{locale('menu.player')}</P>
            <Count>{player}</Count>
            <StyledStepper
              max={MAX_PLAYER}
              min={MIN_PLAYER}
              value={player}
              onChange={this.bindValueChange('player')}/>
          </Flex>
        </Section>
        <Section>
          <Flex>
            <P>{locale('menu.spy')}</P>
            <Count>{spy}</Count>
            <StyledStepper
              max={maxSpy}
              min={1}
              value={spy}
              onChange={this.bindValueChange('spy')}/>
          </Flex>
        </Section>
        <Section>
          <Label>
            <P>{locale('menu.whiteboard')}</P>
            <Count>{+whiteboard}</Count>
            <StyledSwitch
              value={whiteboard}
              onChange={this.bindValueChange('whiteboard')}/>
          </Label>
        </Section>
        <Section>
          <Flex>
            <SubmitButton to={`/game?player=${player}&spy=${spy}&whiteboard=${+whiteboard}`}>
              <ButtonContent>{locale('menu.start')}</ButtonContent>
            </SubmitButton>
            <SubmitButtonNoPadding onClick={this.toggleRuleAlert}>
              <ButtonIcon src='/img/question.svg'/>
            </SubmitButtonNoPadding>
            <SubmitButtonNoPadding onClick={this.openFanPage}>
              <ButtonIcon src='/img/facebook.svg'/>
            </SubmitButtonNoPadding>
          </Flex>
        </Section>
        <Alert
          show={showRuleAlert}
          title={locale('menu.alert.ruleTitle')}
          onCancel={this.toggleRuleAlert}
          onConfirm={this.toggleRuleAlert}>
          {this.renderRule()}
        </Alert>
      </Container>
    )
  }

  bindValueChange = name => value => this.setState({ [name]: value })

  renderRule = () => (
    <RuleContainer>
      <ol>
      {locale('menu.alert.rules').map((rule, key) => <li key={key}>{rule}</li>)}
      </ol>
    </RuleContainer>
  )

  toggleRuleAlert = () => {
    this.setState({ showRuleAlert: !this.state.showRuleAlert })
  }

  openFanPage = () => {
    window.open('https://www.facebook.com/WhoIsSpyWeb/')
  }
}
