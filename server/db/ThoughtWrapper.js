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
  nextNode: { type: conn.Sequelize.INTEGER, defaultValue: null },
  previousNode: { type: conn.Sequelize.INTEGER, defaultValue: null }
})

ThoughtWrapper.belongsTo(Thought)
ThoughtWrapper.belongsTo(Cluster)
Cluster.hasMany(ThoughtWrapper)

ThoughtWrapper.wrap = function(clusterId, thoughtId) {
  return this.create({ clusterId, thoughtId })
}

ThoughtWrapper.findLast = function(current) {
  return this.findById(current)
    .then(current => (
      current.nextNode ? this.findLast(current.nextNode) : current
    ))
}

Cluster.createCluster = function(clusterInfo, thoughts) {
  // thoughts are sequelize objects
  return Cluster.create(clusterInfo)
    .then(cluster => {
      return Promise.each(thoughts, thought => (
        cluster.appendThought(thought) 
      ))
    })
}

Cluster.prototype.moveAfter = function(after, thought) {
  /*
    wrapper.previousNode.wrapper.nextNode -> wrappernextNode.
    after.nextNode.wrapper.previousNode -> wrapper
    wrapper.previousNode -> after
    wrapper.nextNode -> afternextNode.
    after.nextNode -> wrapper
  */
  return Promise.all([
    ThoughtWrapper.findOne({ where: { clusterId: this.id, thoughtId: after.id } }),
    ThoughtWrapper.findOne({ where: { clusterId: this.id, thoughtId: thought.id } })
  ])
  .then(([ afterWrapper, thoughtWrapper ]) => (
    Promise.all([
      afterWrapper,
      thoughtWrapper,
      ThoughtWrapper.findOne({ where: { clusterId: this.id, thoughtId: afterWrapper.previousNode } }),
      ThoughtWrapper.findOne({ where: { clusterId: this.id, thoughtId: afterWrapper.nextNode } }),
      ThoughtWrapper.findOne({ where: { clusterId: this.id, thoughtId: thoughtWrapper.previousNode } }),
      ThoughtWrapper.findOne({ where: { clusterId: this.id, thoughtId: thoughtWrapper.nextNode } })
    ])
  ))
  // .then(([ afterWrapper, thoughtWrapper, afterWrapperPrevious, thoughtWrapperPrevious ]) => {
    // console.log(
    //   afterWrapper.nextNode,
    //   thoughtWrapper.nextNode,
    //   afterWrapperPrevious && afterWrapperPrevious.nextNode,
    //   thoughtWrapperPrevious && thoughtWrapperPrevious.nextNode)
    // thoughtWrapperPrevious && thoughtWrapperPrevious.update({ nextNode: thoughtWrapper.nextNode }),

    // afterWrapperPrevious && afterWrapperPrevious.update({ previousNode: afterWrapper.id })
  // })
}

Cluster.prototype.moveToHead = function(thought) {
  /*
    wrapper.previousNode.wrapper.nextNode -> wrappernextNode.
    wrapper.previousNode -> null
    cache this.head
    this.head.previousNode -> wrapper
    wrapper.nextNode -> this.headpreviousNode.
    head -> wrapper
  */
}

Cluster.prototype.appendThought = function(thought) {
  return ThoughtWrapper.wrap(this.id, thought.id)
    .then(wrapper => (
      !this.head ?
        this.update({ head: wrapper.id }) :
        ThoughtWrapper.findLast(this.head)
          .then(last => Promise.all([
            last.update({ nextNode: wrapper.id }),
            wrapper.update({ previousNode: last.id }) ]))
    ))
}

Cluster.prototype.removeThought = function(thought) {
  
}

module.exports = { Cluster, Thought, ThoughtWrapper }