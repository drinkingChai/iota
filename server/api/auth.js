const router = require('express').Router()
const jwt = require('jsonwebtoken')
const env = require('../env')
const { verifyToken } = require('./authcheck')
const { User } = require('../db').models

const publicUserInfo = (user) => ({
  email: user.email,
  id: user.id
})

router.post('/', (req, res, next) => {
  // log in
  const { email, password } = req.body
  // User.findOne({ where: { email, password } })
  User.matchUser({ email }, password)
    .then(user => {
      if (!user) return res.sendStatus(403)
      res.send({ jotKey: jwt.sign({ user: publicUserInfo(user) }, env.JWTKEY) })
    })
    .catch(next)
})

router.put('/change-password', verifyToken, (req, res, next) => {
  // change password while logged on
  User.updatePassword({ id: req.user.id }, req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

module.exports = router
