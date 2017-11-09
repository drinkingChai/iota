const Promise = require('bluebird')
const conn = require('./conn')

const Cluster = conn.define('cluster', {
  name: conn.Sequelize.STRING,
  description: conn.Sequelize.STRING,
  head: { type: conn.Sequelize.INTEGER, defaultValue: null }
})

Cluster.createCluster = function(clusterInfo, thoughts) {
  // thoughts are sequelize objects
  return Cluster.create(clusterInfo)
    .then(cluster => {
      return Promise.each(thoughts, thought => (
        cluster.appendThought(thought) 
      ))
    })
}

Cluster.prototype.findNext = function(currentId, nodes) {
  nodes = nodes || []
  return conn.models.thoughtnode.findOne({ where: { clusterId: this.id, id: currentId } })
    .then(node => {
      nodes.push(node.thoughtId)
      if (node.nextNode) return this.findNext(node.nextNode, nodes)
      return nodes
    })
}

Cluster.prototype.findNodes = function() {
  return this.findNext(this.head)
  //   .then(_nodes => {
  //     console.log(_nodes)
  //   })
}

Cluster.prototype.moveAfter = function(after, thought) {
  /*
    wrapper.previousNode.wrapper.nextNode -> wrappernextNode.
    after.nextNode.wrapper.previousNode -> wrapper
    wrapper.previousNode -> after
    wrapper.nextNode -> afternextNode.
    after.nextNode -> wrapper

    edge case: if already in right position
  */
  return Promise.all([
    conn.models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: after.id } }),
    conn.models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: thought.id } })
  ])
  .then(([ after, wrapper ]) => (
    Promise.all([
      after,
      wrapper,
      conn.models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: after.nextNode } }),
      conn.models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: wrapper.previousNode } }),
      conn.models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: wrapper.nextNode } })
    ])
  ))
  .then(([ after, wrapper, afterNextNode, previous, next ]) => {
    // console.log(
    //   after.id,
    //   wrapper.id,
    //   afterNextNode && afterNextNode.id,
    //   previous && previous.id,
    //   next && next.id)

    // edge case
    if (after.nextNode == wrapper.id) return

    return Promise.all([
      previous && previous.update({ nextNode: wrapper.nextNode }),
      next && next.update({ previousNode: wrapper.previousNode }),
      after.update({ nextNode: wrapper.id }),
      wrapper.update({ previousNode: after.id, nextNode: afterNextNode.id }),
      afterNextNode && afterNextNode.update({ previousNode: wrapper.id })
    ])
  })
}

Cluster.prototype.moveToHead = function(thought) {
  /*
    wrapper.previousNode.wrapper.nextNode -> wrappernextNode.
    wrapper.previousNode -> null
    cache this.head
    this.head.previousNode -> wrapper
    wrapper.nextNode -> this.headpreviousNode.
    head -> wrapper

    edge case: if already head
  */
  return Promise.all([
    conn.models.thoughtnode.findOne({ where: { id: this.head } }),
    conn.models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: thought.id } }),
  ])
  .then(([ head, wrapper ]) => (
    Promise.all([
      head,
      wrapper,
      conn.models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: wrapper.previousNode } }),
      conn.models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: wrapper.nextNode } })
    ])
  ))
  .then(([ head, wrapper, thoughtPrevious, thoughtNext ]) => {
    // console.log(
    //   head,
    //   wrapper.id,
    //   thoughtPrevious && thoughtPrevious.id,
    //   thoughtNext && thoughtNext.id)

    return Promise.all([
      thoughtPrevious && thoughtPrevious.update({ nextNode: wrapper.nextNode }),
      thoughtNext && thoughtNext.update({ previousNode: wrapper.previousNode }),
      wrapper.update({ previousNode: null, nextNode: this.head }),
      this.update({ head: wrapper.id }),
      head.update({ previousNode: wrapper.id })
    ])
  })
}

Cluster.prototype.appendThought = function(thought) {
  return conn.models.thoughtnode.wrap(this.id, thought.id)
    .then(wrapper => (
      !this.head ?
        this.update({ head: wrapper.id }) :
        conn.models.thoughtnode.findLast(this.head)
          .then(last => Promise.all([
            last.update({ nextNode: wrapper.id }),
            wrapper.update({ previousNode: last.id }) ]))
    ))
}

Cluster.prototype.removeThought = function(thought) {
  /*
    wrapper.next -> wrapper.previous.next
    wrapper.next.previous -> wrapper.previous
    delete wrapper

    edge case: thought is head
  */
  return conn.models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: thought.id } })
    .then(wrapper => (
      Promise.all([
        wrapper,
        conn.models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: wrapper.previousNode } }),
        conn.models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: wrapper.nextNode } })
      ])
    ))
    .then(([ wrapper, previous, next ]) => (
      Promise.all([
        previous && previous.update({ nextNode: wrapper.nextNode }),
        next && next.update({ previousNode: wrapper.previousNode }),
        wrapper.id == this.head ? this.update({ head: wrapper.nextNode }) : null,
        wrapper.destroy()
      ])
    ))
}




/* ================================================= */
/* ================= api wrappers  ================= */

Cluster.getCluster = function(clusterId) {
  return this.findById(clusterId)
    .then(cluster => cluster.findNodes())
    .then(nodes => Promise.all(nodes.map(n => conn.models.thought.findById(n))))
}

Cluster.getClusterOrder = function(clusterId) {
  return this.findById(clusterId)
    .then(cluster => cluster.findNodes())
}

Cluster.makeCluster = function(clusterInfo, thoughtsIds) {
  return Promise.all(thoughtsIds.map(id => conn.models.thought.findById(id)))
    .then(thoughts => (
      this.createCluster(clusterInfo, thoughts)
    ))
}

Cluster.appendTo = function(clusterId, thoughtId) {
  return this.findById(clusterId)
    .then(cluster => (
      conn.models.thought.findById(thoughtId)
        .then(thought => cluster.appendThought(thought))
    ))
}

Cluster.moveBehind = function(clusterId, behindId, thoughtId) {
  return this.findById(clusterId)
    .then(cluster => (
      Promise.all([
        conn.models.thought.findById(behindId),
        conn.models.thought.findById(thoughtId)
      ])
      .then(([ after, thought ]) => cluster.moveAfter(after, thought))
    ))
}

Cluster.makeHead = function(clusterId, thoughtId) {
  return this.findById(clusterId)
    .then(cluster => (
      conn.models.thought.findById(thoughtId)
        .then(thought => cluster.moveToHead(thought))
    ))
}

Cluster.removeFrom = function(clusterId, thoughtId) {
  return this.findById(clusterId)
    .then(cluster => (
      conn.models.thought.findById(thoughtId)
        .then(thought => cluster.removeThought(thought))
    ))
}

module.exports = Cluster
