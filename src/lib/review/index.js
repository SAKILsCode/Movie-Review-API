/**
 * Title: Review Service
 * Description: This file contains all the business logics and service functions need to implement all the actions on Review resource.
 */

/**
 * DEV NOTE:
 * While requesting for Review an extra server request for Movie is added to ensure appropriate errors and possible good user experience API user.
 *
 * TODO: fix issue of circular dependency while reusing services from other file
 * Possible fix: separated service file.
 */

// Dependencies and other imports
const defaults = require('../../config/defaults');
const { Review, Movie, User } = require('../../model');
const {
  countAll,
  findAllOf,
  mongooseIdValidator,
  deleteAllOf,
} = require('../utils');
const {
  badRequest,
  notFound,
  authorizationError,
} = require('../../utils/error');

/**
 * Find all reviews of a Movie
 * @param {String} movieId
 * @param {Object} query
 * @returns {Array}
 */
const findAll = async (
  movieId,
  {
    page = defaults.page,
    limit = defaults.limit,
    sortType = defaults.sortType,
    sortBy = defaults.sortBy,
    search = defaults.search,
  }
) => {
  if (!mongooseIdValidator(movieId)) throw badRequest('Invalid Movie Id type.');

  const movie = await Movie.findById(movieId);
  if (!movie) throw notFound('Movie not found.');

  return findAllOf(
    Review,
    { text: search, movieId },
    { page, limit, sortType, sortBy }
  );
};

/**
 * count the number of filtered reviews
 * @param {String} search
 * @param {String} authorId
 * @returns {Promise}
 */
const count = (search = defaults.search, authorId = '') => {
  return countAll(Review, { text: search, authorId });
};

/**
 * Create a new review
 * @param {Object} requestData
 * @returns {object}
 */
const create = async ({ loggedInAuthorId, movieId, rating, text }) => {
  if (!movieId || !rating) throw badRequest('Invalid required field...');
  if (!loggedInAuthorId) throw badRequest('Author id is required.');

  if (!mongooseIdValidator(movieId)) throw badRequest('Invalid Movie Id type.');
  if (!mongooseIdValidator(loggedInAuthorId))
    throw badRequest('Invalid Author Id type.');

  const movie = await Movie.findById(movieId);
  if (!movie) throw notFound('Movie not found.');

  const user = await User.findById(loggedInAuthorId);
  if (!user) throw notFound('User not found.');

  const review = new Review({
    authorId: loggedInAuthorId,
    movieId,
    rating,
    text,
  });

  await review.save();
  return {
    ...review._doc,
    id: review.id,
  };
};

/**
 * Find a single review
 * @param {String} id
 * @param {String} movieId
 * @returns {Object}
 */
const findSingle = async (id, movieId) => {
  if (!mongooseIdValidator(id)) throw badRequest('Invalid Review Id.');
  if (!mongooseIdValidator(movieId)) throw badRequest('Invalid Movie Id.');

  const review = await Review.findById(id);
  if (!review) throw notFound('Review Not Found.');

  const movie = await Movie.findById(movieId);
  if (!movie) throw notFound('Movie not found.');

  if (review.movieId !== movie.id)
    throw badRequest("Review doesn't belong to the movie.");

  return review;
};

/**
 * Update a Review
 * @param {String} id
 * @param {String} movieId
 * @param {String} loggedInUserId
 * @param {Object} requestData
 * @returns {Object} updated data
 */
const update = async (id, movieId, loggedInUserId, { rating, text }) => {
  // Checking possible errors
  if (!rating) throw badRequest('Invalid required field...');

  if (!mongooseIdValidator(id)) throw badRequest('Invalid Review Id type.');
  if (!mongooseIdValidator(movieId)) throw badRequest('Invalid Movie Id type.');
  if (!mongooseIdValidator(loggedInUserId))
    throw badRequest('Invalid Author Id type.');

  const loggedInUser = await User.findById(loggedInUserId);
  if (!loggedInUser) throw notFound('User not found.');

  const movie = await Movie.findById(movieId);
  if (!movie) throw notFound('Movie not found.');

  const review = await Review.findById(id);
  if (!review) throw notFound('Review Not Found.');

  if (review.movieId !== movie.id)
    throw badRequest("Review doesn't belong to the movie.");

  if (review.authorId !== loggedInUser.id)
    throw authorizationError(
      "User doesn't have permission to update this review."
    );

  // Change properties data with given data
  review.rating = rating || review.rating;
  review.text = text || review.text;

  // Saving on DB
  review.save();
  return {
    ...review._doc,
    id: review.id,
  };
};

/**
 * Delete a review (PRIVATE)
 * @param {String} id
 * @param {String} movieId
 * @param {String} userId
 * @returns {Promise}
 */
const deleteOne = async (id, movieId, userId) => {
  if (!mongooseIdValidator(id)) throw badRequest('Invalid Review Id.');
  if (!mongooseIdValidator(movieId)) throw badRequest('Invalid Movie Id.');
  if (!mongooseIdValidator(userId)) throw badRequest('Invalid User Id type.');

  const loggedInUser = await User.findById(userId);
  if (!loggedInUser) throw notFound('User not found.');

  const movie = await Movie.findById(movieId);
  if (!movie) throw notFound('Movie not found.');

  const review = await Review.findById(id);
  if (!review) throw notFound('Review Not Found.');

  if (review.movieId !== movie.id)
    throw badRequest("Review doesn't belong to the movie.");

  // admin can delete any valid review
  if (loggedInUser.role === 'admin') return Review.findByIdAndDelete(id);

  // user can only delete his own valid review
  if (review.authorId !== loggedInUser.id)
    throw badRequest("Review doesn't belong to the User.");

  return Review.findByIdAndDelete(id);
};

/**
 * Delete all reviews (PRIVATE)
 * @param {Object} requestObject
 */
const deleteAll = async ({ authorId, movieId }) => {
  if (!mongooseIdValidator(authorId))
    throw badRequest('Invalid authorId Type.');
  const author = await User.findById(authorId);
  if (!author) throw notFound('Author not found.');

  // TODO: Refactor

  if (authorId && movieId) {
    if (!mongooseIdValidator(movieId))
      throw badRequest('Invalid movieId Type.');
    const movie = await Movie.findById(movieId);
    if (!movie) throw notFound('Movie not found.');

    await deleteAllOf(Review, {
      authorId,
      movieId,
    });
  }

  if (!movieId) {
    await deleteAllOf(Review, {
      authorId,
    });
  }

  if (!authorId) {
    await deleteAllOf(Review, {
      movieId,
    });
  }
};

module.exports = {
  findAll,
  count,
  create,
  findSingleReview: findSingle,
  update,
  deleteOne,
  deleteAllReviews: deleteAll,
};
