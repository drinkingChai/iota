const conn = require('./conn')
const MachineData = require('./MachineData')

// associations

const sync = () => conn.sync()

module.exports = {
  sync,
  models: {
    MachineData
  }
}
