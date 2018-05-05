import styled, { css } from 'styled-components'

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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title = styled.h1`
  font-size: 60px;
  font-weight: bold;
  margin: 0 0 30px;
  color: ${theme.accent};
  user-select: none;
`
const Section = styled.section`
  margin: 12px 0;
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
  width: 70px;
  height: 34px;
  margin-left: 10px;
`
const StyledSwitch = styled(Switch)`
  width: 70px;
  height: 34px;
  margin-left: 10px;
`
const SubmitButton = styled(Button)`
  margin-top: 30px;
  padding: 20px 28px;
`

export default class MenuPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      player: 4,
      spy: 1,
      whiteboard: false
    }
  }

  render = () => {
    const { player, spy, whiteboard } = this.state
    const maxSpy = Math.ceil(player / 4) - whiteboard

    return (
      <Container onClick={e => e.preventDefault()}>
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
        </Section>
      </Container>
    )
  }

  bindValueChange = name => value => this.setState({ [name]: value })
}
