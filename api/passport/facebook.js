const router = require('express').Router()
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const { verifyToken, generateToken } = require('../authcheck')
const { User } = require('../../db').models
const env = require('../../env')


passport.use(
  // configuration passport will use to authenticate
  new FacebookStrategy({
    clientID: env.FACEBOOK_APP_ID,
    clientSecret: env.FACEBOOK_APP_SECRET,
    callbackURL: env.FACEBOOK_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    // function used to verify
    let query = {
      facebookId: `${profile.id}`
    }

    User.passportAuth(query)
      .then(user => {
        done(null, user)
      })
  }
))

router.get('/',
  passport.authenticate('facebook'))

router.get('/verify',
  passport.authenticate('facebook', { session: false }),
  (req, res, next) => {
    const { user } = req
    if (!user) return res.sendStatus(403)
    res.redirect(`/?token=${generateToken(user).jotKey}`)
  })

module.exports = router