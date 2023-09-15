// Import external services and dependencies
const { query } = require('../../../../utils');
const {findUserMovies: userMovies} = require('../../../../lib/user');
const defaults = require('../../../../config/defaults');
const { count: movieCount } = require('../../../../lib/movie');

// Find all movies of a users Controller
const findUserMovies = async (req, res, next) => {
  // Params id
  const authorId = req.params.id;
  // query data
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;

  // Using Find All user movies service
  try {
    const movies = await userMovies(authorId, {
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    // data transformation
    const data = query.transformItems({
      items: movies,
      path: req.path,
      selection: [
        'id',
        'authorId',
        'title',
        'poster',
        'releaseDate',
        'duration',
        'totalRating',
        'genre',
        'description',
        'createdAt',
        'updatedAt',
      ],
    });

    // pagination
    const totalItems = await movieCount(search, authorId);
    const pagination = query.getPagination({ totalItems, limit, page });

    // HATEOAS Links
    const links = query.allItemsHATEOAS({
      path: req.path,
      query: req.query,
      hasNext: !!pagination.nextPage,
      hasPrev: !!pagination.prevPage,
      page,
    });

    // Structured Response object
    const response = {
      data,
      pagination,
      links,
    };

    // send response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findUserMovies;
