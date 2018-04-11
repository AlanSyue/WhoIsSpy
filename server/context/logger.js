import bunyan from 'bunyan'

import config from '../../config'

const logger = bunyan.createLogger({
  name: config.app.name,
  level: config.logLevel,
  serializers: bunyan.stdSerializers
})

export default logger
