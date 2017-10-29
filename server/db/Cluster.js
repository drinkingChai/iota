const conn = require('./conn')
const machine = require('../machine')

const Cluster = conn.define('cluster', {
  text: {
    type: conn.Sequelize.STRING,
  }
})

function findAndAddToCluster (thought, cluster) {
  return conn.models.thought.findById(thought.id)
    .then(thought => cluster.addThoughts(thought))
}

Cluster.clusterThoughts = function(thoughts) {
  return Cluster.create()
    .then(cluster => Promise.all(thoughts.map(thought => findAndAddToCluster(thought, cluster))))
}

module.exports = Cluster
