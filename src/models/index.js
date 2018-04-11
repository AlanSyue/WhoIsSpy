import { init } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'

import question from './question'

const loading = createLoadingPlugin()

export default init({
  models: {
    question
  },
  plugins: [
    loading
  ]
})
