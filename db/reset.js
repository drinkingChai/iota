const conn = require('./conn')
const { Thought, Cluster } = require('./index').models

Thought.destroy({
  where: {},
  truncate: true
})
  .then(() => Cluster.destroy({
      where: {},
      truncate: true
    }))
  .then(() => {
    console.log('thoughts & clusters deleted')
    conn.close()
  })
