import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

export default class GamePage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    query: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    getQuestionAsync: PropTypes.func.isRequired
  }

  static defaultProps = {
    query: {},
    getQuestionAsync: noop
  }

  componentDidMount = () => {
   this.props.getQuestionAsync()
  }

  render = () => {
    const { loading, query, question } = this.props

    return (
      <div>
        Card
        <div>{question.spy}</div>
        {JSON.stringify(query, null, '\t')}
        {loading && <div>Loading...</div>}
      </div>
    )
  }
}
