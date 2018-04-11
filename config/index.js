const merge = require('lodash/merge')

const config = {
  app: {
    host: process.env.SERVER_HOST || '0.0.0.0',
    name: process.env.SERVER_NAME || 'who-is-spy-web',
    port: +process.env.SERVER_PORT || 3010
  },
  logLevel: process.env.LOG_LEVEL || 'info',
  pg: {
    driver: 'pg',
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_SERVICE_HOST || '127.0.0.1',
    port: +process.env.POSTGRES_SERVICE_PORT || 5432
  }
}

const env = process.env.NODE_ENV || 'development'

try {
  merge(config, require('./' + env))
} catch (err) {
  console.log('Failed to load config:', env)
}

module.exports = config
