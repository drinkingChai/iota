const router = require('express').Router()
const { generateToken } = require('./authcheck')
const { User } = require('../db').models

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.send(generateToken(user)))
})

module.exports = router