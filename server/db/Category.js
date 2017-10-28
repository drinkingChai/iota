// uses MonkeyLearn classifier

const conn = require('./conn')
const env = require('../env')
var MonkeyLearn = require('monkeylearn');

var ml = new MonkeyLearn(process.env.ML_API_KEY || env.ML_API_KEY);
var module_id = 'cl_b7qAkDMz';

const Category = conn.define('category', {
  label: {
    type: conn.Sequelize.STRING,
  },
  category_id: {
    type: conn.Sequelize.INTEGER,
    allowNull: false,
    validate: { notEmpty: true }
  }
})

Category._findOrCreate = function(mlcat) {
  const { category_id, label } = mlcat
  return this.findOne({ where: { label } })
    .then(cat => {
      if (!cat) return Category.create({ category_id: category_id || null, label })
      return cat
    })
}

Category.classifyThought = function(thought) {
  return ml.classifiers.classify(module_id, [thought.text], false)
    .then(res => Promise.all(res.result[0].map(cat => Category._findOrCreate(cat))))
    .then(cats => Promise.all(cats.map(cat => cat.addThoughts(thought))))
}

module.exports = Category
