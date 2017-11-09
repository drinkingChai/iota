const conn = require('./conn')
const MachineData = require('./MachineData')
const Thought = require('./Thought')
const Category = require('./Category')
const Cluster = require('./Cluster')
const ThoughtNode = require('./ThoughtNode')
const User = require('./User')

// associations
User.hasMany(Thought)
Thought.belongsTo(User)

ThoughtNode.belongsTo(Thought)
ThoughtNode.belongsTo(Cluster)
Cluster.hasMany(ThoughtNode)

Category.belongsToMany(Thought, { through: 'thought_category' })
Thought.belongsToMany(Category, { through: 'thought_category' })

const sync = () => conn.sync()

module.exports = {
  sync,
  models: {
    MachineData,
    Thought,
    Cluster,
    User
  }
}
