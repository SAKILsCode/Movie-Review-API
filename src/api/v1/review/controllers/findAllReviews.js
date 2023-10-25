// Import external services and dependencies
const { query } = require('../../../../utils');
const {findAll, count} = require('../../../../lib/review');
const defaults = require('../../../../config/defaults');

// Find all reviews Controller
const findAllReviews = async (req, res, next) => {
  // url data
  const movieId = req.params.movieId

  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;

  // Using Find All Review service
  try {
    const reviews = await findAll(movieId, {
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    // data transformation
    const data = query.transformItems({
      items: reviews,
      path: req.path,
      selection: [
        'id',
        'movieId',
        'authorId',
        'rating',
        'text',
        'createdAt',
        'updatedAt',
      ],
    });

    // pagination
    const totalItems = await count(search);
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

module.exports = findAllReviews;
