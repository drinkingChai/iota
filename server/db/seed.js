const fs = require('fs')
const path = require('path')

const conn = require('./conn')
const { MachineData } = require('./index').models

const files = [ 'diary1.txt', 'diary2.txt', 'diary3.txt', 'blogs.txt' ]
const documents = []

files.forEach(file => {
  fs.readFileSync(path.join(__dirname, '..', 'machine', 'samples', `${file}`), 'utf-8').split('\n').forEach(line => {
    const split = line.split('-')
    const category = split[0].trim()
    const phrase = split.slice(1).join(' ').trim()
    if (!phrase || !category) return
    documents.push({ category, phrase })
  })
})

conn.sync({ force: true })
  .then(() => Promise.all(documents.map(doc => MachineData.create(doc))))
  .then(() => {
    console.log('db seeded')
    conn.close()
  })
