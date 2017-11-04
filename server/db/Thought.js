const conn = require('./conn')
const machine = require('../machine')

const Thought = conn.define('thought', {
  text: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  created_at: {
    type: conn.Sequelize.DATE
  }
})

Thought.createAndClassify = function(content) {
  return this.create(content)
    .then(thought => conn.models.category.classifyThought(thought))
}

Thought.storeAndCluster = function(content, userId) {
  const date = new Date()
  Object.assign(content, { userId })

  return this.findAll({ order: [[ 'updatedAt', 'DESC' ]], where: { userId } })
    .then(function(thoughts) {
      if (!thoughts.length) {
        // optimistic: assumes userId is valid
        return Thought.createAndClassify(content)
      }

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
              Thought.createAndClassify(content, userId)
            ])
          })
      }
      return Thought.createAndClassify(content)
    })
}

Thought.getThoughtsAndClassify = function(userId) {
  return this.findAll({ where: { userId }, order: [[ 'updatedAt', 'DESC' ]], include: [ conn.models.category ] })
    .then(thoughts =>
      thoughts.map(thought => ({
        id: thought.id,
        text: thought.text,
        created: thought.created_at || thought.createdAt,
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

Thought.deleteThought = function(id) {
  return this.findById(id)
    .then(thought => thought.destroy()) 
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

Thought.removeCategory = function(id, categoryId) {
  return Thought.findById(id)
    .then(thought => {
      return conn.models.category.findById(categoryId)
        .then(category => {
          return thought.removeCategories(category)
        })
    })
}

Thought.addCategory = function(id, category) {
  return Thought.findById(id)
    .then(thought => {
      return conn.models.category._findOrCreate(category)
        .then(category => {
          return thought.addCategories(category)
        })
    })
}

module.exports = Thought
