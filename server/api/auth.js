const router = require('express').Router()
const { User } = require('../db').models

router.post('/', (req, res, next) => {
  const { email, password } = req.body
  User.findOne({ where: { email, password } })
    .then(user => {
      if (!user) return res.sendStatus(401)

      req.session.id = user.id
      req.session.email = user.email
      res.sendStatus(200)
    })
})

router.get('/', (req, res, next) => {
  res.send(req.session)
})

router.delete('/', (req, res, next) => {
  delete req.session.id
  delete req.session.email
  res.sendStatus(200)
})

module.exports = router
