import styled, { css } from 'styled-components'

import Button from '~/modules/common/Button'
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
const P = styled.p`
  font-size: 20px;
  color: ${theme.textPrimary};
  line-height: 1;
  user-select: none;
`
const Title = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: ${theme.accent};
  user-select: none;
`
const Section = styled.section`
  margin: 12px 0;
`
const Flex = styled.div`${flex}`
const Label = styled.label`
  ${flex}
  cursor: pointer;
`
const StyledStepper = styled(Stepper)`
  width: 76px;
  height: 34px;
  margin-left: 10px;
`
const StyledSwitch = styled(Switch)`
  width: 60px;
  height: 34px;
  margin-left: 10px;
`
const SubmitButton = styled(Button)`
  margin: 20px 0;
  padding: 16px 24px;
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
    const maxSpy = Math.ceil(player / 4)


    return (
      <Container>
        <Title>{locale('menu.title')}</Title>
        <Section>
          <Flex>
            <P>{player} = {player - spy - +whiteboard} + {spy} + {+whiteboard}</P>
          </Flex>
        </Section>
        <Section>
          <Flex>
            <P>{locale('menu.player')}</P>
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
            <StyledSwitch
              value={whiteboard}
              onChange={this.bindValueChange('whiteboard')}/>
          </Label>
        </Section>
        <Section>
          <SubmitButton to={`/game`}>
            <P>{locale('menu.start')}</P>
          </SubmitButton>
        </Section>
      </Container>
    )
  }

  bindValueChange = name => value => this.setState({ [name]: value })
}
