const conn = require('./conn')

const Cluster = conn.define('cluster', {
  name: {
    type: conn.Sequelize.STRING
  },
  description: {
    type: conn.Sequelize.STRING
  },
  head: {
    type: conn.Sequelize.INTEGER,
    // allowNull: false
  }
})

module.exports = Cluster
