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

const Twitter = require('twitter');
const env = require('../env')
const twitter_users = require('../twitter_users')
 
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY || env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET || env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN || env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET || env.TWITTER_TOKEN_SECRET 
});
 
var params = {screen_name: 'drinkingChai'};
client.get('statuses/user_timeline', params)

const fetchTwitterData = () => {
  return Promise.all(twitter_users.map(user => User.create({ email: user, password: 'jot' })))
    .then(users => {
      return Promise.all(users.map(user => {
        return client.get('statuses/user_timeline', { screen_name: user.email })
          .then(tweets => {
            return Promise.all(tweets.map(tweet => {
              const { text, created_at } = tweet
              return Thought.storeAndCluster({ text, created_at, userId: user.id })
            }))
          })
      }))
    })
}
  

conn.sync({ force: true })
  .then(() => Promise.all(documents.map(doc => MachineData.create(doc))))
  .then(() => User.create({ email: 'teatocode@gmail.com', password: 'jot' }))
  .then(() => fetchTwitterData())
  .then(() => {
    console.log('db seeded')
    conn.close()
  })
