// Import external services and dependencies
const reviewService = require('../../../../lib/review');

// Create review Controller
const createReview = async (req, res, next) => {
  // request data
  const movieId = req.query.movieId;
  const rating = req.query.rating;
  const text = req.query.text;

  // Using Create review service
  try {
    const {
      id,
      movieId: reviewMovieId,
      userId,
      rating: reviewRating,
      text: reviewText,
      createdAt,
      updatedAt,
    } = await reviewService.createReview({ movieId, rating, text });

    // Structured Response object
    const response = {
      data: {
        id,
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
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = createReview;
