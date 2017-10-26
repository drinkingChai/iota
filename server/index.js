const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const sessions = require('client-sessions')
const db = require('./db')
const env = require('./env')

const app = express()
app.use(require('morgan')('dev'))
app.use(sessions({
  cookieName: 'session',
  secret: process.env.SESSIONSECRET || env.SESSIONSECRET,
  maxAge: 30 * 60 * 1000
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', express.static(path.join(__dirname, '..', 'public')))
app.use('/api', require('./api'))

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err)
})

const port = process.env.PORT || 3000

db.sync()
  .then(() => app.listen(port, () => console.log(`listening on port ${port}`)))
