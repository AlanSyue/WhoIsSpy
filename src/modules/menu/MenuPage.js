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
  margin-top: 10px;
  padding: 20px 28px;

  :first-child {
    margin-right: 20px;
  }
`
const RuleContainer = styled.div`
  color: ${theme.textPrimary};
  font-size: 14px;
  max-height: 50vh;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;

  ol {
    margin-right: 5px;
  }

  li {
    margin: 5px 0;
  }
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
          <SubmitButton to={`/game?player=${player}&spy=${spy}&whiteboard=${+whiteboard}`}>
            <ButtonContent>{locale('menu.start')}</ButtonContent>
          </SubmitButton>
          <SubmitButton onClick={this.toggleRuleAlert}>
            <ButtonContent>{locale('menu.rule')}</ButtonContent>
          </SubmitButton>
        </Section>
        <Alert
          show={showRuleAlert}
          title={locale('game.alert.ruleTitle')}
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
        <li>選擇玩家人數</li>
        <li>選擇「臥底」人數，其餘為「平民」，自行選擇是否要開啟「白板」</li>
        <li>按下「開始遊戲」</li>
        <li>輪流抽卡，記住卡上的詞彙，按下「我記住了」並拍照</li>
        <li>抽完後，每人輪流用一段話，隱約地描述、暗示你拿到的詞彙</li>
        <li>切記不可說到詞彙上的字，也不可以說謊</li>
        <li>若為身份為「白板」（詞彙為「白板」），就觀察其他人的說明來唬爛，掩飾身為「白板」的事實</li>
        <li>每個人都講完後，投票出心目中是「臥底」的人，點擊最高票玩家頭像按下「處決」</li>
        <li>被「處決」玩家即死亡，下一輪描述開始，死亡玩家無法參與描述以及投票</li>
        <li>所有「臥底」先被「處決」則為「平民」獲勝且遊戲結束，反之亦然</li>
      </ol>
    </RuleContainer>
  )

  toggleRuleAlert = e => {
    this.setState({ showRuleAlert: !this.state.showRuleAlert })
  }
}
