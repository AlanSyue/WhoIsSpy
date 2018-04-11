const Sequelize = require('sequelize')

export default sequelize => sequelize.define('Question', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  loyal: {
    type: Sequelize.TEXT
  },
  spy: {
    type: Sequelize.TEXT
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at'
  },
  deletedAt: {
    type: Sequelize.DATE,
    field: 'deleted_at'
  }
}, {
  paranoid: true,
  tableName: 'questions'
})
