// Import external services and dependencies
const movieService = require('../../../../lib/movie');

// Create movie Controller
const createMovie = async (req, res, next) => {
  // request data
  const title = req.body.title;
  const poster = req.body.poster;
  const releaseDate = req.body.releaseDate;
  const duration = req.body.duration;
  const genre = req.body.genre;
  const description = req.body.description;

  // Using Create movie service
  try {
    const {
      id,
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
    } = await movieService.createMovie({
      title,
      poster,
      releaseDate,
      duration,
      genre,
      description,
    });

    // Structured Response object
    const response = {
      data: {
        id,
        authorId,
        title: movieTitle,
        poster: moviePoster,
        releaseDate: movieReleaseDate,
        duration: movieDuration,
        genre: movieGenre,
        description: movieDescription,
        createdAt,
        updatedAt,
      },
      links: {
        self: req.path,
        movie: `/movies/${id}`,
      },
    };

    // send response
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = createMovie;
