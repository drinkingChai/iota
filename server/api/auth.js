const router = require('express').Router()
const jwt = require('jsonwebtoken')
const env = require('../env')
const { tokenExists } = require('./authcheck')
const { User } = require('../db').models

const publicUserInfo = (user) => ({
  email: user.email,
  id: user.id
})

router.post('/', (req, res, next) => {
  // log in
  const { email, password } = req.body
  User.findOne({ where: { email, password } })
    .then(user => {
      if (!user) return res.sendStatus(403)
      res.send({ jotKey: jwt.sign({ user: publicUserInfo(user) }, env.JWTKEY) })
    })
})

module.exports = router
