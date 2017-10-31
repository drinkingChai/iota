const conn = require('./conn')

const User = conn.define('user', {
  email: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
    unique: true
  },
  password: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  }
})

module.exports = User
