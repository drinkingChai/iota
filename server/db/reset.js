const conn = require('./conn')
const { Thought } = require('./index').models

Thought.destroy({
  where: {},
  truncate: true
})
  .then(() => {
    console.log('thoughts deleted')
    conn.close()
  })
