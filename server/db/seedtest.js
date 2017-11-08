const conn = require('./conn')
const { Cluster, Thought, ThoughtWrapper } = require('./ThoughtWrapper')

const thoughts = [
  { text: 'Thought 1' },
  { text: 'Thought 2' },
  { text: 'Thought 3' }
]

const thought4 = { text: 'Thought 4' }

const clusterInfo = { name: 'Thoughts 1,2,3' }

const seed = () => {
  let _cluster, _thought4
  return Promise.all(thoughts.map(t => Thought.create(t)))
    .then(thoughts => Cluster.makeCluster(clusterInfo, thoughts.map(t => t.id)))
    .then(() => Promise.all([
      Cluster.findOne({ where: { name: 'Thoughts 1,2,3' } }),
      Thought.findOne({ where: { text: 'Thought 1' } }),
      Thought.findOne({ where: { text: 'Thought 3' } })
    ]))
    .then(([ cluster, thought1, thought2 ]) => {
      _cluster = cluster
      return cluster.moveAfter(thought1, thought2)
    })
    .then(() => Thought.create(thought4))
    .then(thought => {
      _thought4 = thought
      return Cluster.appendTo(_cluster.id, thought.id)
    })
    .then(() => Cluster.makeHead(_cluster.id, _thought4.id))
}

// seed prompt
conn.sync({ force: true })
  .then(seed)
  .then(() => {
    console.log('db seeded')
    conn.close()
  })
