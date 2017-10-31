const { User } = require('../db').models

module.exports.requireLogin = (req, res, next) => {
  User.findById(req.session.id)
    .then(user => {
      if (user) return next()
      res.sendStatus(401)
    })
}
