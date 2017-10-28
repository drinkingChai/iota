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
  return this.create(content)
    .then(data => machine.getClassifications(data.text))
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
