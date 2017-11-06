const router = require('express').Router()
const { verifyToken } = require('./authcheck')

router.use('/auth', require('./auth'))
router.use('/users', require('./users'))

const { MachineData } = require('../db').models
router.post('/train', (req, res, next) => {
  MachineData.storeAndTrain(req.body)
    .then(() => res.sendStatus(201))
    .catch(next)
})

const { Thought } = require('../db').models
router.post('/thoughts', verifyToken, (req, res, next) => {
  Thought.storeAndCluster(req.body, req.user.id)
    .then(classification => res.send(classification))
    .catch(next)
})

router.get('/thoughts', verifyToken, (req, res, next) => {
  Thought.getThoughtsAndClassify(req.user.id)
    .then(thoughts => res.send(thoughts))
    .catch(next)
})

router.delete('/thoughts/:id/remove-category/:categoryId', verifyToken, (req, res, next) => {
  // needs auth
  Thought.removeCategory(req.params.id, req.params.categoryId)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put('/thoughts/:id/add-category', verifyToken, (req, res, next) => {
  // needs auth
  Thought.addCategory(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.delete('/thoughts/:id/remove-cluster/:clusterId', verifyToken, (req, res, next) => {
  // needs auth
  Thought.removeFromCluster(req.params.id, req.params.clusterId)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put('/thoughts/:id', verifyToken, (req, res, next) => {
  // needs auth
  Thought.updateThoughtAndClassify(req.params.id, req.body)
    .then(classification => res.send(classification))
    .catch(next)
})

router.delete('/thoughts/:id', verifyToken, (req, res, next) => {
  // needs auth
  Thought.deleteThought(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next)
})

const { Cluster } = require('../db').models
router.post('/clusters', verifyToken, (req, res, next) => {
  // needs auth
  Cluster.clusterThoughts(req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

module.exports = router
