const conn = require('./conn')
const bcrypt = require('bcrypt-as-promised')
const generator = require('generate-password')
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
  },
  googleId: {
    type: conn.Sequelize.STRING
  },
  facebookId: {
    type: conn.Sequelize.STRING
  }
}, {
  hooks: {
    beforeCreate(instance, options) {
      return hashInstancePassword(instance)
    },
    beforeUpdate(instance, options) {
      return instance.changed('password') ?
        hashInstancePassword(instance) :
        instance
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

User.updateUser = function(query, profileData) {
  return this.findOne({ where: query })
    .then(user => {
      Object.assign(user, profileData)
      return user.save()
    })
}

User.passportAuth = function(query) {
  return this.findOne({ where: query })
    .then(user => {
      if (user) return user

      Object.assign(query, { password: generator.generate({ length: 15, numbers: true })} )
      return User.create(query)
    })
}

module.exports = User
