// Import external services and dependencies
const movieService = require('../../../../lib/movie');

// Update movie Controller
const updateMovie = async (req, res, next) => {
  // query data
  const id = req.query.id;
  // Request data
  const title = req.body.title;
  const poster = req.body.poster;
  const releaseDate = req.body.releaseDate;
  const duration = req.body.duration;
  const genre = req.body.genre;
  const description = req.body.description;

  // Using update movie service
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
    } = await movieService.updateMovie(id, {
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
        id: userId,
        username: name,
        email: userEmail,
        role: userRole,
        totalRated,
        createdAt,
        updatedAt,
      },
      links: {
        self: req.path,
        movie: `/movies/${id}`,
      },
    };

    // send response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateMovie;
