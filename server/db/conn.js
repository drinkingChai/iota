const Sequelize = require('sequelize')
const env = require('../env')
const conn = new Sequelize(process.env.DATABASE_URL || env.DATABASE_URL, { logging: false, operatorsAliases: false })

module.exports = conn
