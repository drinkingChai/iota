const conn = require('./conn')
const { Cluster, Thought } = require('./index').models

const thoughts = [
  { text: 'Thought 1' },
  { text: 'Thought 2' },
  { text: 'Thought 3' }
]

const thought4 = { text: 'Thought 4' }

const clusterInfo = { name: 'Thoughts 1,2,3' }

const seed = () => {
  let _cluster, _thought3, _thought4
  return Promise.all(thoughts.map(t => Thought.create(t)))
    .then(thoughts => Cluster.makeCluster(clusterInfo, thoughts.map(t => t.id)))
    .then(() => Promise.all([
      Cluster.findOne({ where: { name: 'Thoughts 1,2,3' } }),
      Thought.findOne({ where: { text: 'Thought 1' } }),
      Thought.findOne({ where: { text: 'Thought 3' } })
    ]))
    .then(([ cluster, thought1, thought3 ]) => {
      _cluster = cluster
      _thought3 = thought3
      return Cluster.moveBehind(cluster.id, thought1.id, thought3.id)
    })
    .then(() => Thought.create(thought4))
    .then(thought => {
      _thought4 = thought
      return Cluster.appendTo(_cluster.id, thought.id)
    })
    .then(() => Cluster.makeHead(_cluster.id, _thought4.id))
    .then(() => Cluster.removeFrom(_cluster.id, _thought3.id))
    .then(() => Cluster.getCluster(_cluster.id))
}

// seed prompt
conn.sync({ force: true })
  .then(seed)
  .then(() => {
    console.log('db seeded')
    conn.close()
  })
