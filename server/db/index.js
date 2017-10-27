const conn = require('./conn')
const MachineData = require('./MachineData')
const Thought = require('./Thought')

// associations

const sync = () => conn.sync()

module.exports = {
  sync,
  models: {
    MachineData,
    Thought
  }
}
