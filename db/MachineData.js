// const conn = require('./conn')
// const machine = require('../machine')

// const MachineData = conn.define('machinedata', {
//   phrase: {
//     type: conn.Sequelize.STRING,
//     allowNull: false,
//     validate: { notEmpty: true }
//   },
//   category: {
//     type: conn.Sequelize.STRING,
//     allowNull: false,
//     validate: { notEmpty: true }
//   }
// })

// MachineData.storeAndTrain = function(content) {
//   return this.create(content)
//     .then(data => {
//       machine.addDocument(data.phrase, data.category)
//       machine.train()
//     })
// }

// module.exports = MachineData
