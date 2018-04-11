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

  :active {
    background: ${theme.widgetActive};
  }
`

const renderButton = ({ children, className }) => <Button className={className}>{children}</Button>

export default ({ children, className, to }) => to
  ? <Link to={to}><a>{renderButton({ children, className })}</a></Link>
  : renderButton({ children, className })
