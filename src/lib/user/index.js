/**
 * Title: User Service
 * Description: This file contains all the business logics and service functions need to implement all the actions on User resource.
 */

// Dependencies and other imports
const defaults = require('../../config/defaults');
const { User, Movie, Review } = require('../../model');
const { conflict, badRequest, notFound } = require('../../utils/error');
const { countAll, findAllOf, mongooseIdValidator } = require('../utils');
const { generateHash } = require('../../utils/hashing');
const { deleteAllMovies } = require('../movie');
const { deleteAllReviews } = require('../review');

/**
 * Find a user by email
 * @param {String} email
 * @returns {Promise}
 */
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user ? user : false;
};

/**
 * Find all filtered Users
 * @param {Object} queryObject
 * @returns {Array}
 */
const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  return findAllOf(
    User,
    { username: search },
    { page, limit, sortType, sortBy }
  );
};

/**
 * Count all filtered Users
 * @param {String} search
 * @returns {Promise}
 */
const count = (search = defaults.search) => {
  return countAll(User, { username: search });
};

/**
 * Create a User
 * @param {Object} requestObject
 * @returns {Object}
 */
const create = async ({ username, email, password, role = 'user' }) => {
  if (!username || !email || !password)
    throw badRequest('Invalid credentials.');

  const existingUser = await findUserByEmail(email);
  if (existingUser) throw conflict('User already exist.');

  // Hash password
  password = await generateHash(password);

  const user = new User({
    username,
    email,
    password,
    role,
  });

  await user.save();
  return {
    ...user._doc,
    id: user.id,
    totalRated: 0,
  };
};

/**
 * Find a single user by id
 * @param {String} id
 * @returns {Object}
 */
const findSingle = async (id) => {
  if (!mongooseIdValidator(id)) throw badRequest('Invalid User Id.');

  const user = await User.findById(id);
  if (!user) throw notFound("User doesn't exist.");

  return user;
};

/**
 * Update a user
 * @param {String} id
 * @param {Object} param1
 * @returns {Object}
 */
const update = async (id, { username, email, password, role }) => {
  if (!username && !email && !password && !role)
    throw badRequest('Request cannot be empty field.');

  if (!mongooseIdValidator(id)) throw badRequest('Invalid User Id.');

  const user = await User.findById(id);
  if (!user) throw notFound("User doesn't exist.");

  const checkUser = await findUserByEmail(email);
  if (checkUser && checkUser.id !== user.id)
    throw conflict('Email belongs to another user.');

  // Hash password
  if (password) password = await generateHash(password);

  // Change user
  user.username = username || user.username;
  user.email = email || user.email;
  user.password = password || user.password;
  user.role = role || user.role;

  await user.save();
  return {
    ...user._doc,
    id: user.id,
  };
};

/**
 * Delete a user
 * @param {id} id
 * @returns {Object}
 */
const deleteOne = async (id) => {
  if (!mongooseIdValidator(id)) throw badRequest('Invalid User Id.');

  // Delete all user reviews
  await deleteAllReviews({ authorId: id });

  // Delete all user movies
  await deleteAllMovies(id);

  const user = await User.findByIdAndDelete(id);
  if (!user) throw notFound("User doesn't exist.");

  return user;
};

/**
 * Find all movies of the user
 * @param {String} authorId
 * @param {Object} queryParams
 * @returns {Array}
 */
const findUserMovies = async (
  authorId,
  { page, limit, sortType, sortBy, search }
) => {
  if (!mongooseIdValidator(authorId)) throw badRequest('Invalid Author Id.');

  const user = await User.findById(authorId);
  if (!user) throw notFound("Author doesn't exist.");

  return findAllOf(
    Movie,
    { title: search, authorId },
    { page, limit, sortType, sortBy }
  );
};

/**
 * Find all movies of the user
 * @param {String} authorId
 * @param {Object} queryParams
 * @returns {Array}
 */
const findUserReviews = async (
  authorId,
  { page, limit, sortType, sortBy, search }
) => {
  if (!mongooseIdValidator(authorId)) throw badRequest('Invalid Author Id.');

  const user = await User.findById(authorId);
  if (!user) throw notFound("Author doesn't exist.");

  return findAllOf(
    Review,
    { text: search, authorId },
    { page, limit, sortType, sortBy }
  );
};

module.exports = {
  findUserByEmail,
  findAll,
  count,
  create,
  findSingleUser: findSingle,
  update,
  deleteOne,
  findUserMovies,
  findUserReviews,
};
