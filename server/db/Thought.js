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
  return this.findAll()
    .then(thoughts =>
      thoughts.map(thought => ({
        id: thought.id,
        text: thought.text,
        classifications: machine.getClassifications(thought.text).slice(0,5)
      }))
    )
}

module.exports = Thought
