// Import Review Service
const reviewService = require('../../../../lib/review');

// Delete Review controller
const deleteReview = async (req, res, next) => {
  const id = req.params.id;
  const movieId = req.params.movieId;

  try {
    // Deleting by deleteReview service
    await reviewService.deleteReview(id, movieId);

    // send response
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = deleteReview;
