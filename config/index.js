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
    host: process.env.POSTGRES_SERVICE_HOST || 'postgres_container',
    port: +process.env.POSTGRES_SERVICE_PORT || 54320
  },
  apiUrl: process.env.API_URL,
  webUrl: process.env.WEB_URL || 'http://localhost:4000'
}

module.exports = config
