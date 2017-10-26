const conn = require('./conn')

// associations

const sync = () => conn.sync()

module.exports = {
  sync,
  models: {
  }
}
