const conn = require('./conn')
const models = conn.models

const ThoughtNode = conn.define('thoughtnode', {
  nextNode: { type: conn.Sequelize.INTEGER, defaultValue: null },
  previousNode: { type: conn.Sequelize.INTEGER, defaultValue: null }
})

ThoughtNode.wrap = function(clusterId, thoughtId) {
  return models.thought.findById(thoughtId)
    .then(thought => thought.update({ clusterId }))
    .then(() => this.create({ clusterId, thoughtId }))
}

ThoughtNode.findLast = function(current) {
  return this.findById(current)
    .then(current => (
      current.nextNode ? this.findLast(current.nextNode) : current
    ))
}

module.exports = ThoughtNode