const router = require('express').Router()
const { verifyToken } = require('./authcheck')

router.use('/auth', require('./auth'))
router.use('/thoughts', require('./thoughts'))
router.use('/users', require('./users'))
router.use('/test', require('./test'))

const { MachineData } = require('../db').models
router.post('/train', (req, res, next) => {
  MachineData.storeAndTrain(req.body)
    .then(() => res.sendStatus(201))
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
