const conn = require('./conn')
const Promise = require('bluebird')

const Cluster = conn.define('cluster', {
  name: conn.Sequelize.STRING,
  description: conn.Sequelize.STRING,
  head: { type: conn.Sequelize.INTEGER, defaultValue: null }
})

const Thought = conn.define('thought', {
  text: conn.Sequelize.TEXT 
})

const ThoughtWrapper = conn.define('thoughtwrapper', {
  next: { type: conn.Sequelize.INTEGER, defaultValue: null }
})

ThoughtWrapper.belongsTo(Thought)
ThoughtWrapper.belongsTo(Cluster)
Cluster.hasMany(ThoughtWrapper)

ThoughtWrapper.findLast = function(currentHead) {
  return this.findById(currentHead)
    .then(current => (
      current.next ? this.findLast(current.next) : current
    ))
}

Cluster.createCluster = function(clusterInfo, thoughts) {
  // thoughts are sequelize objects
  let cluster
  return Cluster.create(clusterInfo)
    .then(_cluster => cluster = _cluster) // caching
    .then(() => Promise.each(thoughts, (thought) => (
      ThoughtWrapper.create({ clusterId: cluster.id, thoughtId: thought.id })
    )))
    .then(wrappers => Promise.each(wrappers, (wrapper) => (
      cluster.head == null ?
        cluster.update({ head: wrapper.id }) :
        ThoughtWrapper.findLast(cluster.head)
          .then(last => last.update({ next: wrapper.id }))
    )))
}

module.exports = { Cluster, Thought, ThoughtWrapper }