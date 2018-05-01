import styled from 'styled-components'

import { Link } from '~/routes'

import theme from '~/constants/theme'

const Button = styled.button`
  background-color: ${theme.widget};
  border-radius: 4px;
  color: ${theme.textPrimary};
  cursor: pointer;
  border: none;
  outline: none;
  user-select: none;
  -webkit-tap-highlight-color: ${theme.widgetActive};
  opacity: ${props => props.disable ? 0.2 : 1};
  pointer-events: ${props => props.disable ? 'none' : 'all'};
  transition: opacity .3s cubic-bezier(.4, 0, .2, 1);

  :active {
    background: ${theme.widgetActive};
  }
`

const renderButton = ({ children, className, disable, onClick }) => <Button className={className} disable={disable} onClick={onClick}>{children}</Button>

export default ({ children, className, disable, to, onClick }) => to && !disable
  ? <Link to={to}><a>{renderButton({ children, className, onClick })}</a></Link>
  : renderButton({ children, className, disable, onClick })
