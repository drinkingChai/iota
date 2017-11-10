const Promise = require('bluebird')
const conn = require('./conn')
const models = conn.models

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
      .then(() => cluster)
    })
}

Cluster.clusterMerge = function(cluster1Id, cluster2Id) {
  return Promise.all([
    // find cluster 1
    // find cluster 2
    this.findById(cluster1Id),
    this.findById(cluster2Id)
    
  ])
  .then(([ cl1, cl2 ]) => {
    return Promise.all([
      // find last of cluster1
      // find head of cluster2
      cl1.findTail(),
      models.thoughtnode.findById(cl2.head)
    ])
  })
  .then(([ tail, head ]) => {
    return Promise.all([
      // tail.nextNode = head.id
      // head.previousNode = tail.id
      // all thoughtNodes with cluster2 update id to cluster1
      tail.update({ nextNode: head.id }),
      head.update({ previousNode: tail.id }),
      models.thoughtnode.findAll({ where: { clusterId: cluster2Id } })
        .then(nodes => Promise.all(nodes.map(node => node.update({ clusterId: cluster1Id }))))
    ])
  })
}

Cluster.pipe = function(items, userId, aggr) {
  if (!items.length) return Promise.resolve(aggr)

  if (!aggr) {
    let removed = items.shift()
    return this.pipe(items, userId, removed)
  }

  let item = items.shift()

  switch (true) {
    case aggr.type == 'cluster' && item.type == 'thought':
      return this.appendTo(aggr.id, item.id)
        .then(cluster => this.pipe(items, userId, { type: 'cluster', id: cluster.id }))
    case aggr.type == 'thought' && item.type == 'cluster':
      return this.appendTo(item.id, aggr.id)
        .then(cluster => this.pipe(items, userId, { type: 'cluster', id: cluster.id }))
    case aggr.type == 'thought' && item.type == 'thought':
      return this.makeCluster({ userId }, [ item.id, aggr.id ])
        .then(cluster => this.pipe(items, userId, { type: 'cluster', id: cluster.id }))
    case aggr.type == 'cluster' && item.type == 'cluster':
      return this.clusterMerge(aggr.id, item.id)
        .then(() => this.pipe(items, userId, { type: 'cluster', id: aggr.id }))
    default:
      return
  }
}

Cluster.prototype.findTail = function(node) {
  return !node ?
    models.thoughtnode.findById(this.head)
      .then(node => this.findTail(node)) :
    node && node.nextNode ?
    models.thoughtnode.findById(node.nextNode)
      .then(node => this.findTail(node)) :
    node
  // if (!node) {
  //   return models.thoughtnode.findById(this.head)
  //     .then(node => this.findTail(node))
  // }
  // if (node && node.nextNode) {
  //   // console.log(node.nextNode)
  //   return models.thoughtnode.findById(node.nextNode)
  //     .then(node => this.findTail(node))
  // }
  // return node
}

Cluster.prototype.findNext = function(currentId, nodes = []) {
  return models.thoughtnode.findOne({ where: { clusterId: this.id, id: currentId } })
    .then(node => {
      nodes.push(node.thoughtId)
      if (node.nextNode) return this.findNext(node.nextNode, nodes)
      return nodes
    })
}

Cluster.prototype.findNodes = function() {
  return this.findNext(this.head)
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
    models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: after.id } }),
    models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: thought.id } })
  ])
  .then(([ after, wrapper ]) => (
    Promise.all([
      after,
      wrapper,
      models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: after.nextNode } }),
      models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: wrapper.previousNode } }),
      models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: wrapper.nextNode } })
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
    models.thoughtnode.findOne({ where: { id: this.head } }),
    models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: thought.id } }),
  ])
  .then(([ head, wrapper ]) => (
    Promise.all([
      head,
      wrapper,
      models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: wrapper.previousNode } }),
      models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: wrapper.nextNode } })
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
  return models.thoughtnode.wrap(this.id, thought.id)
    .then(wrapper => (
      !this.head ?
        this.update({ head: wrapper.id }) :
        models.thoughtnode.findLast(this.head)
          .then(last => Promise.all([
            last.update({ nextNode: wrapper.id }),
            wrapper.update({ previousNode: last.id }) ]))
    ))
    .then(() => this)
}

Cluster.prototype.removeThought = function(thought) {
  /*
    wrapper.next -> wrapper.previous.next
    wrapper.next.previous -> wrapper.previous
    delete wrapper

    edge case: thought is head
  */
  return models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: thought.id } })
    .then(wrapper => (
      Promise.all([
        wrapper,
        models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: wrapper.previousNode } }),
        models.thoughtnode.findOne({ where: { clusterId: this.id, thoughtId: wrapper.nextNode } })
      ])
    ))
    .then(([ wrapper, previous, next ]) => (
      Promise.all([
        previous && previous.update({ nextNode: wrapper.nextNode }),
        next && next.update({ previousNode: wrapper.previousNode }),
        wrapper.id == this.head ? this.update({ head: wrapper.nextNode }) : null,
        // wrapper.id == this.head && !wrapper.nextNode ? this.destroy : this.head ? this.update({ head: wrapper.nextNode }) : null,
        wrapper.destroy(),
        thought.update({ clusterId: null })
      ])
    ))
}

// merge pipeline




/* ================================================= */
/* ================= api wrappers  ================= */

Cluster.getCluster = function(clusterId) {
  return this.findById(clusterId)
    .then(cluster => 
      cluster.findNodes()
        .then(nodes => Promise.all(nodes.map(n => models.thought.findById(n))))
        .then(nodes => ({ cluster, nodes }))
    )
}

Cluster.getClusterOrder = function(clusterId) {
  return this.findById(clusterId)
    .then(cluster => ({ cluster, nodes: cluster.findNodes() }))
}

Cluster.makeCluster = function(clusterInfo, thoughtsIds) {
  return Promise.all(thoughtsIds.map(id => models.thought.findById(id)))
    .then(thoughts => (
      this.createCluster(clusterInfo, thoughts)
    ))
}

Cluster.appendTo = function(clusterId, thoughtId) {
  return this.findById(clusterId)
    .then(cluster => (
      models.thought.findById(thoughtId)
        .then(thought => cluster.appendThought(thought))
    ))
}

Cluster.moveBehind = function(clusterId, behindId, thoughtId) {
  return this.findById(clusterId)
    .then(cluster => (
      Promise.all([
        models.thought.findById(behindId),
        models.thought.findById(thoughtId)
      ])
      .then(([ after, thought ]) => cluster.moveAfter(after, thought))
    ))
}

Cluster.makeHead = function(clusterId, thoughtId) {
  return this.findById(clusterId)
    .then(cluster => (
      models.thought.findById(thoughtId)
        .then(thought => cluster.moveToHead(thought))
    ))
}

Cluster.removeFrom = function(clusterId, thoughtId) {
  return this.findById(clusterId)
    .then(cluster => (
      models.thought.findById(thoughtId)
        .then(thought => cluster.removeThought(thought))
    ))
}

Cluster.merge = function(userId, items) {
  // merge a -> b = result -> merge c
  return this.pipe(items, userId)
}

module.exports = Cluster
