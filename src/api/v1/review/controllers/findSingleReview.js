// Import external services and dependencies
const { findSingleReview: findSingle } = require('../../../../lib/review');

// Find review Controller
const findSingleReview = async (req, res, next) => {
  // url data
  const movieId = req.params.movieId;
  const id = req.params.id;

  // Using findReview service
  try {
    const {
      id: reviewId,
      movieId: reviewMovieId,
      authorId,
      rating: reviewRating,
      text: reviewText,
      createdAt,
      updatedAt,
    } = await findSingle(id, movieId);

    // Structured Response object
    const response = {
      data: {
        id: reviewId,
        movieId: reviewMovieId,
        authorId,
        rating: reviewRating,
        text: reviewText,
        createdAt,
        updatedAt,
      },
      links: {
        self: req.path,
        reviews: req.path.replace(/\/[^/]+$/, '') // removes id from url
      },
    };

    // send response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingleReview;
