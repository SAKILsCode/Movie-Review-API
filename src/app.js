const express = require('express');
const middleware = require('./middleware');

// Express app
const app = express()

// Applying middlewares
middleware(app)
// app.use(routes)

// health endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    health: 'OK'
  })
})

// TODO: Handling errors here

module.exports = app