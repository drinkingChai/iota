const conn = require('./conn')
const MachineData = require('./MachineData')
const Thought = require('./Thought')
const Cluster = require('./Cluster')

// associations
Cluster.hasMany(Thought)
Thought.belongsTo(Cluster)

const sync = () => conn.sync()

module.exports = {
  sync,
  models: {
    MachineData,
    Thought,
    Cluster
  }
}
