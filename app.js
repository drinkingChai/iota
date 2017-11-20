const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db')
const machine = require('./machine')
const env = require('./env')

const app = express()
app.use(require('cors')())
app.use(require('morgan')('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use('/api', require('./api'))

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).send(err)
})

const port = process.env.PORT || 3000

db.sync()
  .then(() => {
    return db.models.MachineData.findAll()
      .then(samples => {
        samples.forEach(data => {
          machine.addDocument(data.phrase, data.category)
        })
        machine.train()
      })
  })
  .then(() => app.listen(port, () => console.log(`listening on port ${port}`)))
