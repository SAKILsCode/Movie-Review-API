// Import external services and dependencies
const { create } = require('../../../../lib/movie');
const { authenticationError } = require('../../../../utils/error');

// Create movie Controller
const createMovie = async (req, res, next) => {
  // request data
  const title = req.body.title;
  const poster = req.body.poster;
  const releaseDate = req.body.releaseDate;
  const duration = req.body.duration;
  const genre = req.body.genre;
  const description = req.body.description;

  // Logged in user data
  const author = req.user.id;

  // Using Create movie service
  try {
    if (!author) throw authenticationError();
    
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
    } = await create({
      authorId: author,
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
        totalRating,
        genre: movieGenre,
        description: movieDescription,
        createdAt,
        updatedAt,
      },
      links: {
        self: req.path,
        movie: `${req.path}/${id}`,
      },
    };

    // send response
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = createMovie;
