const conn = require('./conn')
const machine = require('../machine')

const Thought = conn.define('thought', {
  text: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  }
})

Thought.createAndClassify = function(content) {
  return this.create(content)
    .then(thought => conn.models.category.classifyThought(thought))
}

Thought.storeAndGetClassification = function(content) {
  const date = new Date()
  return this.findAll({ order: [[ 'updatedAt', 'DESC' ]] })
    .then(function(thoughts) {
      let createdWithinLimit = thoughts.find(t => {
        return (date - (new Date(t.createdAt))) / 1000 / 60 < 5
      })

      if (createdWithinLimit && createdWithinLimit.clusterId) {
        Object.assign(content, { clusterId: createdWithinLimit.clusterId })
      } else if (createdWithinLimit) {
        return conn.models.cluster.create()
          .then(function(cluster) {
            Object.assign(createdWithinLimit, { clusterId: cluster.id })
            Object.assign(content, { clusterId: cluster.id })
            return Promise.all([
              createdWithinLimit.save(),
              Thought.createAndClassify(content)
            ])
          })
      }
      return Thought.createAndClassify(content)
    })
}

Thought.getThoughtsAndClassify = function() {
  return this.findAll({ order: [[ 'updatedAt', 'DESC' ]], include: [ conn.models.category ] })
    .then(thoughts =>
      thoughts.map(thought => ({
        id: thought.id,
        text: thought.text,
        created: thought.createdAt,
        updated: thought.updatedAt,
        clusterId: thought.clusterId,
        classifications: thought.categories
      }))
    )
}

Thought.updateThoughtAndClassify = function(id, content) {
  return this.findById(id)
    .then(thought => {
      Object.assign(thought, content)
      return thought.save()
    })
    .then(thought => conn.models.category.classifyThought(thought))
}

Thought.removeFromCluster = function(id, clusterId) {
  return Thought.findById(id)
    .then(thought => {
      Object.assign(thought, { clusterId: null })
      return thought.save()
    })
    .then(() => {
      return Thought.findAll({ where: { clusterId } })
        .then(thoughts => {
          if (thoughts.length == 1) return Thought.removeFromCluster(thoughts[0].id, clusterId)
        })
    })
}

Thought.addToCluster = function(id, clusterId) {
  return conn.models.cluster.findById(clusterId)
    .then(cluster => {
      return Thought.findById(id)
        .then(thought => {
          Object.assign(thought, { clusterId: cluster.id })
          return thought.save()
        })
    })
}

module.exports = Thought
