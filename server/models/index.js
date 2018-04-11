import 'pg'

import Sequelize from 'sequelize'

import config from '../../config'

import logger from '../context/logger'

import Question from './Question'

const sequelize = new Sequelize(config.pg.database, config.pg.user, config.pg.password, {
  host: config.pg.host,
  port: config.pg.port,
  dialect: 'postgres',
  logging: sql => logger.debug({ sql }),
  native: true,
  define: {
    timestamps: true
  },
  dialectOptions: {
    keepAlive: true
  },
  operatorsAliases: false
})

const models = {
  Question: Question(sequelize)
}

Object.keys(models).forEach(function (key) {
  const model = models[key]

  if (typeof model.associate === 'function') {
    model.associate(models)
  }
})

models.sequelize = sequelize

module.exports = models
