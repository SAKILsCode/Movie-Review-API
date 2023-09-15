/**
 * Title: Movie Service
 * Description: This file contains all the business logics service functions need to implement all the actions on Movie entity.
 */

// Dependencies and other imports
const { default: mongoose } = require('mongoose');
const defaults = require('../../config/defaults');
const { Movie, User } = require('../../model');
const { badRequest, notFound } = require('../../utils/error');
const { findAll: findAllUtil, countAll } = require('../utils');

/**
 * Find all movies
 * @param {Object} param0
 * @returns {Array}
 */
const findAll = ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  return findAllUtil(Movie, { page, limit, sortType, sortBy, search });
};

/**
 * count the number of filtered movies
 * @param {Object} param0
 * @returns {Promise}
 */
const count = (search = defaults.search, authorId = '') => {
  return countAll(Movie, search, authorId);
};

/**
 * Create a new movie
 * @param {Object} param0
 * @returns {object}
 */
const create = async ({
  authorId,
  title,
  poster,
  releaseDate,
  duration,
  genre,
  description,
}) => {
  // TODO: authorId must be get and check using locally stored token where user infos are encoded
  // TODO: authorId from params must be removed later

  console.log('title: ', title, ' Author: ', authorId);
  if (!title || !authorId) throw badRequest('Invalid required field...');

  if (!mongoose.Types.ObjectId.isValid(authorId))
    throw badRequest('Invalid Author Id type.');

  const user = await User.findById(authorId.trim());
  if (!user) throw badRequest('Invalid Author.');

  const movie = new Movie({
    authorId,
    title,
    poster,
    releaseDate,
    duration,
    genre,
    description,
  });

  await movie.save();
  return {
    ...movie._doc,
    id: movie.id,
  };
};

/**
 * Find a single movie
 * @param {String} id
 * @returns {Object}
 */
const findSingle = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    throw badRequest('Invalid Movie Id.');

  const movie = await Movie.findById(id);
  if (!movie) throw notFound('Movie Not Found.');

  return movie;
};

/**
 * Update a Movie with given data
 * @param {String} id
 * @param {Object} param1
 * @returns {Object} updated data
 */
const update = async (
  id,
  { title, poster, releaseDate, duration, genre, description }
) => {
  // Checking possible errors
  if (!title || !id) throw badRequest('Invalid required field...');
  if (!mongoose.Types.ObjectId.isValid(id)) throw badRequest('Invalid Id type.');

  const movie = await Movie.findById(id);
  if (!movie) throw notFound('Movie Not Found.');

  // TODO: check if authorId matches with the logged in user from locally stored token, if not throw badRequest error

  // Change properties data with given data
  movie.title = title || movie.title;
  movie.poster = poster || movie.poster;
  movie.releaseDate = releaseDate || movie.releaseDate;
  movie.duration = duration || movie.duration;
  movie.genre = genre || movie.genre;
  movie.description = description || movie.description;

  // Saving on DB
  movie.save();
  return {
    ...movie._doc,
    id: movie.id,
  };
};

/**
 * Delete a movie and returns it
 * @param {String} id 
 * @returns {object}
 */
const deleteOne = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw badRequest('Invalid Id Type.');

  const movie = await Movie.findByIdAndDelete(id);
  if(!movie) throw notFound('Movie Not Found.')
  return movie
};

module.exports = { findAll, count, create, findSingle, update, deleteOne };
