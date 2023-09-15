// Import Movie Service
const { deleteOne } = require('../../../../lib/movie');

// Delete movie controller
const deleteMovie = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Deleting by deleteMovie service
    await deleteOne(id);

    // send response
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = deleteMovie;
