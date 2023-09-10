/**
 * Title: Main Application
 * Description: Application root file, indicates all app level work.
 */

// Dependencies
const express = require('express');
const middleware = require('./middleware');

// Express app
const app = express()

// Applying middlewares
middleware(app)

// TODO: Routes

// health endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    health: 'OK'
  })
})

// TODO: Handling errors 

module.exports = app