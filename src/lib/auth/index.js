/**
 * Title: Auth Service
 * Description: This file contains all the business logics and service functions related to authentication (login & register).
 */

const { badRequest } = require('../../utils/error');
const { compareHash } = require('../../utils/hashing');
const { generateToken } = require('../token');
const { create: createUser, findUserByEmail } = require('../user');

/**
 * Register an user
 * @param {Object} requestObject
 * @returns {Object}
 */
const register = ({ username, email, password }) => {
  return createUser({ username, email, password });
};

/**
 * Login user
 * @param {Object} requestObject
 * @returns {Object} including accessToken
 */
const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw badRequest('Invalid Credentials');

  const matched = await compareHash(password, user.password);
  if (!matched) throw badRequest('Invalid Credentials');

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  
  const token = await generateToken({ payload });
  return {
    ...payload,
    accessToken: token,
  };
};

module.exports = {
  register,
  login,
};
