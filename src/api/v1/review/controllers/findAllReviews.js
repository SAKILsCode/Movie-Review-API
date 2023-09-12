// Import external services and dependencies
const { query } = require('../../../../utils');
const reviewService = require('../../../../lib/review');
const defaultValues = require('../../../../config/defaults');

// Find all reviews Controller
const findAllReviews = async (req, res, next) => {
  // query data
  const movieId = req.query.movieId

  const page = req.query.page || defaultValues.page;
  const limit = req.query.limit || defaultValues.limit;
  const sortType = req.query.sort_type || defaultValues.sortType;
  const sortBy = req.query.sort_by || defaultValues.sortBy;
  const search = req.query.search || defaultValues.search;

  // Using Find All Review service
  try {
    const reviews = await reviewService.findAllReviews(movieId, {
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    // data transformation
    const data = query.transformItems({
      items: reviews,
      path: `/movies/${movieId}/reviews`,
      selection: [
        'id',
        'movieId',
        'userId',
        'rating',
        'text',
        'createdAt',
        'updatedAt',
      ],
    });

    // pagination
    const totalItems = await reviewService.countReviews({ search });
    const pagination = query.getPagination({ totalItems, limit, page });

    // HATEOAS Links
    const links = query.allItemsHATEOAS({
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
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
