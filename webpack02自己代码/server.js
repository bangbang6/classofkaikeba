const express = require('express')

const app = new express()

app.get('/api/info', (req, res) => {
  res.json({
    name: 'bang',
  })
})
app.listen(3000)
