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

function findAndAddToCluster (thought, cluster) {
  return conn.models.thought.findById(thought.id)
    .then(thought => {
      if (thought.clusterId) {
        return conn.models.thought.findAll({ where: { clusterId: thought.clusterId } })
          .then(thoughts => Promise.all(thoughts.map(t => cluster.addThoughts(t))))
      }
      return cluster.addThoughts(thought)
    })
}

Cluster.clusterThoughts = function(thoughts) {
  return Cluster.create()
    .then(cluster => Promise.all(thoughts.map(thought => findAndAddToCluster(thought, cluster))))
}

module.exports = Cluster
