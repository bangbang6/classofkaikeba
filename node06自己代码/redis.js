let redis = require('redis')

let client = redis.createClient(6379, 'localhost')

client.set('hello', 'this is redis')

client.get('hello', (err, v) => {
  console.log(v)
})
