/**
 * Title: Main Application
 * Description: Application root file, indicates all app level work.
 */

// Dependencies
const express = require('express');
const middleware = require('./middleware');
const router = require('./routes');
const { notFound } = require('./utils/error');

// Express app
const app = express();

// Applying middlewares
middleware(app);

// Routes middleware
app.use(router);

// health endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    health: 'OK',
  });
});

// Handling errors
app.use('*', (_req, _res, next) => {
  const error = notFound();
  next(error);
});

app.use((error, _req, res, _next) => {
  if (error.status === 400)
    error.message =
      error.message.length > 60 ? 'Invalid Inputs...' : error.message;

  if (error.status === 500)
    error.message =
      error.message.length > 60 ? 'Internal Server Error...' : error.message;

  console.log(error);
  res.status(error.status).json({
    code: error.status,
    error: error.error,
    message: error.message,
    data: error.errors,
  });

  res.end();
});

module.exports = app;
