const router = require('express').Router()
const { verifyToken } = require('./authcheck')
const { Thought } = require('../db').models

router.post('/', verifyToken, (req, res, next) => {
  Thought.storeAndCluster(req.body, req.user.id)
    .then(classification => res.send(classification))
    .catch(next)
})

router.get('/', verifyToken, (req, res, next) => {
  Thought.getThoughts(req.user.id)
    .then(thoughts => res.send(thoughts))
    .catch(next)
})

router.delete('/:id/remove-category/:categoryId', verifyToken, (req, res, next) => {
  Thought.removeCategory(req.params.id, req.params.categoryId)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put('/:id/add-category', verifyToken, (req, res, next) => {
  Thought.addCategory(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.delete('/:id/remove-cluster/:clusterId', verifyToken, (req, res, next) => {
  Thought.removeFromCluster(req.params.id, req.params.clusterId)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put('/:id', verifyToken, (req, res, next) => {
  Thought.updateThought(req.params.id, req.body)
    .then(classification => res.send(classification))
    .catch(next)
})

router.delete('/:id', verifyToken, (req, res, next) => {
  Thought.deleteThought(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next)
})

module.exports = router