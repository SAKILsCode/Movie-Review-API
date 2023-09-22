// Import Movie Service
const { deleteOne } = require('../../../../lib/movie');
const { authenticationError } = require('../../../../utils/error');

// Delete movie controller
const deleteMovie = async (req, res, next) => {
  // URL data
  const id = req.params.id;

  // Logged in user data
  const userId = req.user.id;

  try {
    if (!userId) throw authenticationError()

    // Deleting by deleteMovie service
    await deleteOne(id, userId);

    // send response
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = deleteMovie;
