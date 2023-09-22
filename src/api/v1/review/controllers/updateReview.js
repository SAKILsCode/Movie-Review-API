// Import external services and dependencies
const {update} = require('../../../../lib/review');

// Update Review Controller
const updateReview = async (req, res, next) => {
  // url data
  const movieId = req.params.movieId;
  const id = req.params.id;

  // Request data
  const rating = req.body.rating;
  const text = req.body.text;

  // Logged in user data
  const loggedInUserId = req.user.id

  // Using Update Review service
  try {
    if (!loggedInUserId) throw authenticationError()

    const {
      id: reviewId,
      movieId: reviewMovieId,
      authorId,
      rating: reviewRating,
      text: reviewText,
      createdAt,
      updatedAt,
    } = await update(id, movieId, loggedInUserId, { rating, text });

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

module.exports = updateReview;
