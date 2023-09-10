/**
 * Title: Middleware index
 * Description: Middleware entry point, contains all global middlewares.
 */

// Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

/**
 * Middleware Serving function
 * @param {Object} app
 */
const middleware = (app) => {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
};

module.exports = middleware;
