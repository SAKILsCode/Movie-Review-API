// Import external services and dependencies
const reviewService = require('../../../../lib/review');

// Update Review Controller
const updateReview = async (req, res, next) => {
  // query data
  const movieId = req.query.movieId;
  const id = req.query.id;

  // Request data
  const rating = req.body.rating;
  const text = req.body.text;

  // Using Update Review service
  try {
    const {
      id: reviewId,
      movieId: reviewMovieId,
      userId,
      rating: reviewRating,
      text: reviewText,
      createdAt,
      updatedAt,
    } = await reviewService.updateReview(id, movieId, { rating, text });

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

module.exports = updateReview;
