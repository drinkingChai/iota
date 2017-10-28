const conn = require('./conn')
const MachineData = require('./MachineData')
const Thought = require('./Thought')
const Category = require('./Category')
const Cluster = require('./Cluster')

// associations
Cluster.hasMany(Thought)
Thought.belongsTo(Cluster)

Category.belongsToMany(Thought, { through: 'thought_category' })
Thought.belongsToMany(Category, { through: 'thought_category' })

const sync = () => conn.sync()

module.exports = {
  sync,
  models: {
    MachineData,
    Thought,
    Cluster
  }
}
