// Import external services and dependencies
const reviewService = require('../../../../lib/review');

// Find review Controller
const findSingleReview = async (req, res, next) => {
  // query data
  const movieId = req.query.movieId;
  const id = req.query.id;

  // Using findReview service
  try {
    const {
      id: reviewId,
      movieId: reviewMovieId,
      userId,
      rating: reviewRating,
      text: reviewText,
      createdAt,
      updatedAt,
    } = await reviewService.findReview(id, movieId);

    // Structured Response object
    const response = {
      data: {
        id: reviewId,
        movieId: reviewMovieId,
        userId,
        rating: reviewRating,
        text: reviewText,
        createdAt,
        updatedAt,
      },
      links: {
        self: req.path,
        review: `/movies/${movieId}/reviews/${id}`,
      },
    };

    // send response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingleReview;
