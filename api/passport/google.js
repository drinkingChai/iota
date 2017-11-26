const router = require('express').Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { verifyToken, generateToken } = require('../authcheck')
const { User } = require('../../db').models
const env = require('../../env')


passport.use(
  // configuration passport will use to authenticate
  new GoogleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    // function used to verify
    let query = {
      email: profile.emails[0].value,
      googleId: `${profile.id}`
    }

    User.passportAuth(query)
      .then(user => {
        done(null, user)
      })
      .catch(err => done(null, false))
  }
))

router.get('/',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' }))

router.get('/verify',
  passport.authenticate('google', { session: false }),
  (req, res, next) => {
    const { user } = req
    if (!user) return res.sendStatus(403)
    res.redirect(`/?token=${generateToken(user).jotKey}`)
  })

module.exports = router