const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const middleware = (app) => {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
};

module.exports = middleware