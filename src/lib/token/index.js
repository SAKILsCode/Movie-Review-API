require('dotenv').config();
const jwt = require('jsonwebtoken');
const { serverError } = require('../../utils/error');

const generateToken = ({
  payload,
  algorithm = 'HS256',
  secret = process.env.ACCESS_TOKEN_SECRET,
  expiresIn = '1h',
}) => {
  try {
    return jwt.sign(payload, secret, {
      algorithm,
      expiresIn,
    });
  } catch (error) {
    console.log('[JWT Error]: ', error);
    throw serverError();
  }
};

const decodeToken = ({ token, algorithm = 'HS256' }) => {
  try {
    return jwt.decode(token, { algorithms: [algorithm] });
  } catch (error) {
    console.log('[JWT Error]: ', error);
    throw serverError();
  }
};

const verifyToken = ({
  token,
  algorithm = 'HS256',
  secret = process.env.ACCESS_TOKEN_SECRET,
}) => {
  try {
    return jwt.verify(token, secret, { algorithms: [algorithm] });
  } catch (error) {
    console.log('[JWT Error]: ', error);
    throw serverError();
  }
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};
