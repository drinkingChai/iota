const router = require('express').Router()
const { verifyToken } = require('./authcheck')
const { Cluster } = require('../db').models

router.get('/', verifyToken, (req, res, next) => {
  Cluster.findAll({ where: { userId: req.user.id } })
    .then(clusters => Promise.all(clusters.map(cluster => Cluster.getCluster(cluster.id))))
    .then(result => res.send(result))
})

router.post('/', verifyToken, (req, res, next) => {
  // needs auth
  Cluster.merge(req.user.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put('/:id', verifyToken, (req, res, next) => {
  Cluster.findById(req.params.id)
    .then(cluster => cluster.update(req.body))
    .then(() => res.sendStatus(200))
})

module.exports = router