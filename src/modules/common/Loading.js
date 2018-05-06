import styled, { keyframes } from 'styled-components'

import theme from '~/constants/theme'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Spinner = styled.div`
  border-radius: 80%;
  display: block;
  height: 50px;
  width: 50px;
  position: relative;
  animation: ${spin} 0.675s linear 0s infinite normal;
  background: ${theme.primary};

  :before, :after {
    content: '';
    display: block;
    position: absolute;
  }

  :before {
    border-radius: 0 90px 90px 0;
    height: 50px;
    width: 50%;
    top: 0;
    right: 0;
    z-index: 1;
    background: ${theme.accent};
    background-image: linear-gradient(${theme.primary}, ${theme.accent});
  }

  :after {
    border-radius: 80%;
    height: 40px;
    width: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background: ${theme.dark};
  }
`

export default () => (
  <Container>
    <Spinner/>
  </Container>
)
