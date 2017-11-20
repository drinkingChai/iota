const router = require('express').Router()
const { User } = require('../../db').models

router.get('/', (req, res, next) => {
  console.log('attempting facebook sign in')
  res.sendStatus(200)
})

module.exports = router