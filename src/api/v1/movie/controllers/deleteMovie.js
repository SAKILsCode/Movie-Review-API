// Import Movie Service
const movieService = require('../../../../lib/movie');

// Delete movie controller
const deleteMovie = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Deleting by deleteMovie service
    await movieService.deleteMovie(id);

    // send response
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = deleteMovie

