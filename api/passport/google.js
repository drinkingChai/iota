const router = require('express').Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const cors = require('cors')
const { User } = require('../../db').models
const env = require('../../env')


passport.use(
  // configuration passport will use to authenticate
  new GoogleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/google/verify'
  },
  (accessToken, refreshToken, profile, done) => {
    // function used to verify
    console.log('what is happening here?')
    console.log('access token: ', accessToken)
    console.log(profile.emails[0].value)
    console.log(profile.id)
    // done('wot is this??')
    // User.findAll({}, function(err, users) {
    //   done(err, users)
    // })

    done(null, 'all good')
  }
))

router.get('/',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' }))

router.get('/verify',
  passport.authenticate('google', { session: false }),
  (req, res, next) => {
    console.log('yay!')
    res.sendStatus(200)
  })

// , failureRedirect: '/login', successRedirect: '/jot'
module.exports = router