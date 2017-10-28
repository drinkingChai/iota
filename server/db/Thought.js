const conn = require('./conn')
const machine = require('../machine')

const Thought = conn.define('thought', {
  text: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  }
})

// for now classify in real time
Thought.storeAndGetClassification = function(content) {
  const date = new Date()
  return this.findAll({ order: [[ 'updatedAt', 'ASC' ]] })
    .then(function(thoughts) {
      let clusterExists = thoughts.find(t => {
        return (date - (new Date(t.createdAt))) / 1000 / 60 < 5
      })

      if (clusterExists && clusterExists.clusterId) {
        Object.assign(content, { clusterId: clusterExists.clusterId })
        return Thought.create(content)
      } else if (clusterExists) {
        return conn.models.cluster.create()
          .then(function(cluster) {
            Object.assign(clusterExists, { clusterId: cluster.id })
            Object.assign(content, { clusterId: cluster.id })
            return Promise.all([
              clusterExists.save(),
              Thought.create(content)
            ])
          })
      } else {
        return Thought.create(content)
      }
    })
}

Thought.getThoughtsAndClassify = function() {
  return this.findAll({ order: [[ 'updatedAt', 'DESC' ]] })
    .then(thoughts =>
      thoughts.map(thought => ({
        id: thought.id,
        text: thought.text,
        created: thought.createdAt,
        updated: thought.updatedAt,
        classifications: machine.getClassifications(thought.text).slice(0,5)
      }))
    )
}

Thought.updateThoughtAndClassify = function(id, content) {
  return this.findById(id)
    .then(thought => {
      Object.assign(thought, content)
      return thought.save()
    })
    .then(thought => {
      const categories = content.categories.split(', ').filter(c => c)
      return Promise.all(
        categories.map(cat =>
          conn.models.machinedata.storeAndTrain({ phrase: thought.text, category: cat })
        ))
    })
}

module.exports = Thought
