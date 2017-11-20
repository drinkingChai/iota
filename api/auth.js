const router = require('express').Router()
const { verifyToken, generateToken } = require('./authcheck')
const { User } = require('../db').models

// google auth
router.use('/google', require('./passport/google'))
// facebook auth
router.use('/facebook', require('./passport/facebook'))

router.post('/', (req, res, next) => {
  // log in
  const { email, password } = req.body
  User.matchUser({ email }, password)
    .then(user => {
      if (!user) return res.sendStatus(403)
      res.send(generateToken(user))
    })
    .catch(next)
})

router.put('/change-password', verifyToken, (req, res, next) => {
  // change password while logged on
  User.updatePassword({ id: req.user.id }, req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put('/update-profile', verifyToken, (req, res, next) => {
  User.updateUser({ id: req.user.id }, req.body)
    .then(user => {
      res.send(generateToken(user))
    }) 
    .catch(next)
})

module.exports = router
