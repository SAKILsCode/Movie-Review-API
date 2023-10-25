/**
 * Title: Movie Service
 * Description: This file contains all the business logics and service functions need to implement all the actions on Movie resource.
 */

/**
 * TODO: fix issue of circular dependency while reusing services from other file
 * Possible fix: separated service file.
 */

// Dependencies and other imports
const defaults = require('../../config/defaults');
const { Movie, User } = require('../../model');
const {
  badRequest,
  notFound,
  authorizationError,
} = require('../../utils/error');
const {
  countAll,
  findAllOf,
  mongooseIdValidator,
  deleteAllOf,
} = require('../utils');
const { deleteAllReviews } = require('../review');

/**
 * Find all movies
 * @param {Object} query
 * @returns {Array}
 */
const findAll = ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  return findAllOf(Movie, { title: search }, { page, limit, sortType, sortBy });
};

/**
 * count the number of filtered movies
 * @param {String} search
 * @param {String} authorId
 * @returns {Promise}
 */
const count = (search = defaults.search, authorId = '') => {
  return countAll(Movie, { title: search, authorId });
};

/**
 * Create a new movie (PRIVATE)
 * @param {Object} requestData
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
  if (!title) throw badRequest('Invalid required field...');
  if (!authorId) throw badRequest('Author Id is required...');

  if (!mongooseIdValidator(authorId))
    throw badRequest('Invalid Author Id type.');

  // Already validated in the service
  // await findSingleUser(authorId);

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
  if (!mongooseIdValidator(id)) throw badRequest('Invalid Movie Id.');

  const movie = await Movie.findById(id);
  if (!movie) throw notFound('Movie Not Found.');

  return movie;
};

/**
 * Update a Movie (PRIVATE)
 * @param {String} id
 * @param {String} authorId
 * @param {Object} requestData
 * @returns {Object} updated data
 */
const update = async (
  id,
  authorId,
  { title, poster, releaseDate, duration, genre, description }
) => {
  // Checking possible errors
  if (!title || !id) throw badRequest('Invalid required field...');
  if (!authorId) throw badRequest('Author id is required...');

  if (!mongooseIdValidator(id)) throw badRequest('Invalid movie id type.');
  if (!mongooseIdValidator(authorId))
    throw badRequest('Invalid authorId type.');

  const movie = await Movie.findById(id);
  if (!movie) throw notFound('Movie Not Found.');
  
  const user = await User.findById(authorId);
  if (!user) throw notFound('Author Not Found.');

  if (movie.authorId !== user.id)
    throw authorizationError("Movie doesn't belongs to the user");

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
 * Delete a movie and returns it (PRIVATE)
 * @param {String} id
 * @param {String} userId
 * @returns {object}
 */
const deleteOne = async (id, userId) => {
  if (!mongooseIdValidator(id)) throw badRequest('Invalid Id Type.');
  if (!mongooseIdValidator(userId)) throw badRequest('Invalid userId Type.');

  const movie = await Movie.findById(id);
  if (!movie) throw notFound('Movie Not Found.');

  const user = await User.findById(userId);
  if (!user) throw notFound('User not found.');

  // delete all reviews
  await deleteAllReviews({ authorId: userId, movieId: movie.id });

  // admin can delete any valid Movie
  if (user.role === 'admin') return Movie.findByIdAndDelete(id);

  if (movie.authorId !== user.id)
    throw authorizationError("Movie doesn't belongs to the user");

  return Movie.findByIdAndDelete(id);
};

/**
 * Delete all movies (PRIVATE)
 * @param {String} userId
 */
const deleteAll = async (userId) => {
  if (!mongooseIdValidator(userId)) throw badRequest('Invalid userId Type.');

  const user = await User.findById(userId);
  if (!user) throw notFound('User not found.');

  await deleteAllOf(Movie, {
    authorId: userId,
  });
};

module.exports = {
  findAll,
  count,
  create,
  findSingleMovie: findSingle,
  update,
  deleteOne,
  deleteAllMovies: deleteAll,
};
