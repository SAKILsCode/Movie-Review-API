// Import external services and dependencies
const { findSingleMovie: findSingle } = require('../../../../lib/movie');

// Find movie Controller
const findSingleMovie = async (req, res, next) => {
  // url data
  const id = req.params.id;

  // Using findMovie service
  try {
    const {
      id: movieId,
      authorId,
      title: movieTitle,
      poster: moviePoster,
      releaseDate: movieReleaseDate,
      duration: movieDuration,
      totalRating,
      genre: movieGenre,
      description: movieDescription,
      createdAt,
      updatedAt,
    } = await findSingle(id);

    // Structured Response object
    const response = {
      data: {
        id: movieId,
        authorId,
        title: movieTitle,
        poster: moviePoster,
        releaseDate: movieReleaseDate,
        duration: movieDuration,
        totalRating,
        genre: movieGenre,
        description: movieDescription,
        createdAt,
        updatedAt,
      },
      links: {
        self: req.path,
        movies: `/movies`,
      },
    };

    // send response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingleMovie;
