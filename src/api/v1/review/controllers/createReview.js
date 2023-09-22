// Import external services and dependencies
const { create } = require('../../../../lib/review');
const { authenticationError } = require('../../../../utils/error');

// Create review Controller
const createReview = async (req, res, next) => {
  const movieId = req.params.movieId;
  // request data
  const rating = req.body.rating;
  const text = req.body.text;

  // Logged in user information
  const loggedInAuthorId = req.user.id;

  // Using Create review service
  try {
    if (!loggedInAuthorId) throw authenticationError()

    const {
      id,
      movieId: reviewMovieId,
      authorId: userId,
      rating: reviewRating,
      text: reviewText,
      createdAt,
      updatedAt,
    } = await create({ loggedInAuthorId, movieId, rating, text });

    // Structured Response object
    const response = {
      data: {
        id,
        movieId: reviewMovieId,
        authorId: userId,
        rating: reviewRating,
        text: reviewText,
        createdAt,
        updatedAt,
      },
      links: {
        self: req.path,
        review: `${req.path}/${id}`,
      },
    };

    // send response
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = createReview;
