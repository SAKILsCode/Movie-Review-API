// Import external services and dependencies
const { update } = require('../../../../lib/movie');
const { authenticationError } = require('../../../../utils/error');

// Update movie Controller
const updateMovie = async (req, res, next) => {
  // url data
  const id = req.params.id;
  // Request data
  const title = req.body.title;
  const poster = req.body.poster;
  const releaseDate = req.body.releaseDate;
  const duration = req.body.duration;
  const genre = req.body.genre;
  const description = req.body.description;

  // Logged in user data
  const author = req.user.id;

  // Using update movie service
  try {
    if (!author) throw authenticationError()

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
    } = await update(id, author, {
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
        movies: `/movies/${id}`,
      },
    };

    // send response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateMovie;
