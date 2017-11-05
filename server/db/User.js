const conn = require('./conn')
const bcrypt = require('bcrypt-as-promised')
const env = require('../env')

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
}, {
  hooks: {
    beforeCreate(instance, options) {
      return hashInstancePassword(instance)
    },
    beforeUpdate(instance, options) {
      return hashInstancePassword(instance)
    }
  }
})

const hashInstancePassword = instance => {
  return bcrypt.hash(instance.password, env.SALTROUNDS)
    .then(hashedPassword => {
      instance.password = hashedPassword
      return instance
    })
}

User.matchUser = function(query, password) {
  return this.findOne({ where: query })
    .then(user => {
      if (!user) { throw new Error('user not found') }

      return bcrypt.compare(password, user.password)
        .then(() => user)
        .catch(() => { throw new Error('invalid username/password') })
    })
}

User.updatePassword = function(query, { password }) {
  return this.findOne({ where: query })
    .then(user => {
      Object.assign(user, { password })
      return user.save()
    })
}

module.exports = User
