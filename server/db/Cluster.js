const conn = require('./conn')
const machine = require('../machine')

const Cluster = conn.define('cluster', {
  text: {
    type: conn.Sequelize.STRING,
  }
})

module.exports = Cluster
