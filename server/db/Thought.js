const conn = require('./conn')
const { models } = conn 
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
}, {
  hooks: {
    afterCreate(instance, options) {
      /* removing classifier temporarily
      models.category.classifyThought(instance)
        .then(() => instance) */
      return instance
    },
    afterUpdate(instance, options) {
      /* removing classifier temporarily
      return instance.changed('text') ?
        models.category.classifyThought(instance)
          .then(() => instance) :
        instance */
      return instance
    }
  }
})

Thought.createAndCluster = function(content) {
  return this.create(content)
    .then(thought => {
      return models.cluster.makeCluster({}, [thought.id])
    })
}

Thought.findWithinLimit = function(userId, minutes) {
  return this.findAll({ where: { userId }, order: [[ 'createdAt', 'DESC' ]], limit: 1 })
    .then(thoughts => {
      if (thoughts.length && (new Date() - (new Date(thoughts[0].createdAt))) / 1000 / 60 < minutes) {
        return models.thoughtnode.findOne({ where: { thoughtId: thoughts[0].id } })
      }
    })
}

Thought.storeAndCluster = function(content, userId) {
  Object.assign(content, { userId })

  return this.findWithinLimit(userId, 5)
    .then(thought => {
      // if there is one, and it's in a cluster, append to that cluster
      // if there is one, but not part of a cluster, place it in cluster
      // otherwise create it
      if (thought) {
        return this.create(content)
          .then(newThought => models.cluster.appendTo(thought.clusterId, newThought.id))
      }
      return this.createAndCluster(content)
    })
}

Thought.getThoughts = function(userId) {
  return this.findAll({ where: { userId }, order: [[ 'updatedAt', 'DESC' ]], include: [ models.category ] })
    .then(thoughts =>
      thoughts.map(thought => ({
        id: thought.id,
        text: thought.text,
        created: thought.created_at || thought.createdAt,
        updated: thought.updatedAt,
        categories: thought.categories
      }))
    )
}

Thought.updateThoughtAndClassify = function(id, content) {
  return this.findById(id)
    .then(thought => {
      Object.assign(thought, content)
      return thought.save()
    })
}

Thought.deleteThought = function(id) {
  // TODO: delete relevant node in cluster
  return this.findById(id)
    .then(thought => thought.destroy()) 
}

Thought.removeCategory = function(id, categoryId) {
  return this.findById(id)
    .then(thought => {
      return models.category.findById(categoryId)
        .then(category => {
          return thought.removeCategories(category)
        })
    })
}

Thought.addCategory = function(id, category) {
  return this.findById(id)
    .then(thought => {
      return models.category._findOrCreate(category)
        .then(category => {
          return thought.addCategories(category)
        })
    })
}

module.exports = Thought
