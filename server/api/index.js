const router = require('express').Router()

const { MachineData } = require('../db').models
router.post('/train', (req, res, next) => {
  MachineData.storeAndTrain(req.body)
    .then(() => res.sendStatus(201))
})

const { Thought } = require('../db').models
router.post('/thoughts', (req, res, next) => {
  Thought.storeAndGetClassification(req.body)
    .then(classification => res.send(classification))
})

router.get('/thoughts', (req, res, next) => {
  Thought.getThoughtsAndClassify()
    .then(thoughts => res.send(thoughts))
})

module.exports = router
