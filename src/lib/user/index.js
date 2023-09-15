/**
 * Title: User Service
 * Description: This file contains all the business logics and service functions need to implement all the actions on User entity.
 */

// Dependencies and other imports
const { default: mongoose } = require('mongoose');
const defaults = require('../../config/defaults');
const { User, Movie, Review } = require('../../model');
const { conflict, badRequest, notFound } = require('../../utils/error');
const { findAll: findAllUtil, countAll, findAllof } = require('../utils');

/**
 * Find all filtered Users
 * @param {*} param0 
 * @returns {Array}
 */
const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  return findAllUtil(User, { page, limit, sortType, sortBy, search });
};

/**
 * Count all filtered Users
 * @param {*} search 
 * @returns {Promise}
 */
const count = (search = defaults.search) => {
  console.log(search);
  return countAll(User, search);
};

/**
 * Create a User
 * @param {*} param0 
 * @returns {Object}
 */
const create = async ({ username, email, password, role }) => {
  if (!username || !email || !password || !role)
    throw badRequest('Invalid credentials.');

  const existingUser = await User.findOne({ email: email });
  if (existingUser) throw conflict('User already exist.');

  const user = new User({
    username,
    email,
    password,
    role,
  });

  // TODO: hash password before saving

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
  if (!mongoose.Types.ObjectId.isValid(id))
    throw badRequest('Invalid User Id.');

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
const update = async (
  id,
  { username, email, password, role }
) => {
  if (!username || !email || !password || !role) throw badRequest('Invalid credentials.');
  if (!mongoose.Types.ObjectId.isValid(id)) throw badRequest('Invalid User Id.');

  const user = await User.findById(id);
  if (!user) throw notFound("User doesn't exist.");

  const checkUser = await User.findOne({ email: email });
  if (checkUser && checkUser.id !== user.id) throw conflict('Email belongs to another user.');

  // TODO: hash password before saving

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
  if (!mongoose.Types.ObjectId.isValid(id)) throw badRequest('Invalid User Id.');

  const user = await User.findByIdAndDelete(id);
  if(!user) throw notFound('User doesn\'t exist.')

  // TODO: Delete all user movies
  // TODO: Delete all user reviews

  return user
};

/**
 * Find all movies of the user
 * @param {String} authorId
 * @param {Object} queryParams
 * @returns {Array}
 */
const findUserMovies = async (authorId, queryParams) => {
  try {
		if (!mongoose.Types.ObjectId.isValid(authorId)) throw badRequest('Invalid Movie Id.');

    const user = await User.findById(authorId);
    if (!user) throw notFound("Author doesn't exist.");

    return findAllof(authorId, Movie, queryParams);
  } catch (error) {
    throw error;
  }
};

/**
 * Find all movies of the user
 * @param {String} authorId
 * @param {Object} queryParams
 * @returns {Array}
 */
const findUserReviews = async (authorId, queryParams) => {
  try {
		if (!mongoose.Types.ObjectId.isValid(authorId)) throw badRequest('Invalid Movie Id.');

    const user = await User.findById(authorId);
    if (!user) throw notFound("Author doesn't exist.");

    return findAllof(authorId, Review, queryParams);
  } catch (error) {
    throw error;
  }
};

module.exports = { findAll, count, create, findSingle, update, deleteOne, findUserMovies, findUserReviews };
