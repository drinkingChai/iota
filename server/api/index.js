const router = require('express').Router()
const { requireLogin } = require('./middlewares')

router.use('/auth', require('./auth'))

const { MachineData } = require('../db').models
router.post('/train', (req, res, next) => {
  MachineData.storeAndTrain(req.body)
    .then(() => res.sendStatus(201))
    .catch(next)
})

const { Thought } = require('../db').models
router.post('/thoughts', (req, res, next) => {
  Thought.storeAndCluster(req.body)
    .then(classification => res.send(classification))
    .catch(next)
})

router.get('/thoughts', (req, res, next) => {
  Thought.getThoughtsAndClassify(req.session.id)
    .then(thoughts => res.send(thoughts))
    .catch(next)
})

router.delete('/thoughts/:id/remove-category/:categoryId', (req, res, next) => {
  Thought.removeCategory(req.params.id, req.params.categoryId)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put('/thoughts/:id/add-category', (req, res, next) => {
  Thought.addCategory(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.delete('/thoughts/:id/remove-cluster/:clusterId', (req, res, next) => {
  Thought.removeFromCluster(req.params.id, req.params.clusterId)
    .then(() => res.sendStatus(200))
    .catch(next)
})

//router.put('/thoughts/:id/add-to-cluster/:clusterId', (req, res, next) => {
  //Thought.addToCluster(req.params.id, req.params.clusterId)
    //.then(() => res.sendStatus(200))
    //.catch(next)
//})

router.put('/thoughts/:id', (req, res, next) => {
  Thought.updateThoughtAndClassify(req.params.id, req.body)
    .then(classification => res.send(classification))
    .catch(next)
})

const { Cluster } = require('../db').models
router.post('/clusters', (req, res, next) => {
  Cluster.clusterThoughts(req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

module.exports = router
