/**
 * Title: Middleware index
 * Description: Middleware entry point, contains all global middlewares.
 */

// Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');

// Loading swagger doc
const swaggerDocument = YAML.load('./swagger.yaml');

/**
 * Middleware Serving function
 * @param {Object} app
 */
const middleware = (app) => {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  // Serving swagger document to "/doc" route
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  // Validation using swagger.yaml
  app.use(
    OpenApiValidator.middleware({
      apiSpec: './swagger.yaml',
    })
  );
};

module.exports = middleware;
