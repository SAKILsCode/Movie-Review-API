// Import Review Service
const {deleteOne} = require('../../../../lib/review');
const { authenticationError } = require('../../../../utils/error');

// Delete Review controller
const deleteReview = async (req, res, next) => {
  // URL data
  const id = req.params.id;
  const movieId = req.params.movieId;

  // Logged in user data
  const loggedInUserId = req.user.id

  try {
    if (!loggedInUserId) throw authenticationError()

    // Deleting by delete service
    await deleteOne(id, movieId, loggedInUserId);

    // send response
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = deleteReview;
