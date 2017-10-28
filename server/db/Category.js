// uses MonkeyLearn classifier

const conn = require('./conn')
const env = require('../env')
var MonkeyLearn = require('monkeylearn');

var ml = new MonkeyLearn(process.env.ML_API_KEY || env.ML_API_KEY);
var module_id = 'cl_b7qAkDMz';
//var text_list = ["A tennis court is the venue where the sport of tennis is played. It is a firm rectangular surface, usually of grass, clay or concrete, with a low net stretched across the center."];
//var p = ml.classifiers.classify(module_id, text_list, false);
//p.then(function (res) {
    //console.log(res.result);
//});

const Category = conn.define('category', {
  label: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  category_id: {
    type: conn.Sequelize.INTEGER,
    allowNull: false,
    validate: { notEmpty: true }
  }
})

Category._findOrCreate = function(mlcat) {
  const { category_id, label } = mlcat
  return this.findOne({ where: { category_id, label } })
    .then(cat => {
      if (!cat) return Category.create({ category_id, label })
      return cat
    })
}

Category.classifyThought = function(thought) {
  return ml.classifiers.classify(module_id, [thought.text], false)
    .then(res => Promise.all(res.result[0].map(cat => Category._findOrCreate(cat))))
    .then(cats => (
      Promise.all(
        cats.map(cat => cat.addThoughts(thought))
      )
    ))
}

module.exports = Category
