const fs = require('fs')
const path = require('path')

const conn = require('./conn')
const { User, MachineData, Thought } = require('./index').models

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

// seed prompt
const prompt = 'Seed the database? (Y/N) '
process.stdin.on('data', function (data) {
  const cmd = data.toString().trim()
  if (cmd == 'Y') {
    conn.sync({ force: true })
      .then(() => Promise.all(documents.map(doc => MachineData.create(doc))))
      .then(() => User.create({ email: 'teatocode@gmail.com', password: 'jot' }))
      .then(() => {
        console.log('db seeded')
        conn.close()
        process.exit(0)
    })
  } else {
    process.exit(0)
  }
})

process.stdout.write(prompt)
