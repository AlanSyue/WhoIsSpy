import styled from 'styled-components'

import { Link } from '~/routes'

import theme from '~/constants/theme'

const Button = styled.button`
  background-color: ${props => props.theme === 'danger' ? theme.widgetDanger : theme.widget};
  border-radius: 4px;
  color: ${theme.textPrimary};
  cursor: pointer;
  font-size: 20px;
  border: none;
  outline: none;
  white-space: nowrap;
  user-select: none;
  opacity: ${props => props.disable ? 0.2 : 1};
  -webkit-tap-highlight-color: ${props => props.theme === 'danger' ? theme.widgetDangerActive : theme.widgetActive};
  pointer-events: ${props => props.disable ? 'none' : 'inherit'};
  transition: opacity .3s cubic-bezier(.4, 0, .2, 1);

  :active {
    background: ${theme.widgetActive};
  }
`

const renderButton = ({ children, className, disable, theme, onClick }) => <Button className={className} disable={disable} theme={theme} onClick={onClick}>{children}</Button>

export default ({ children, className, disable, theme, to, onClick }) => to && !disable
  ? <Link to={to}><a>{renderButton({ children, className, theme, onClick })}</a></Link>
  : renderButton({ children, className, disable, theme, onClick })
