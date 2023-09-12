// Import external services and dependencies
const { query } = require('../../../../utils');
const userService = require('../../../../lib/user');
const defaultValues = require('../../../../config/defaults');

// Find all reviews of a users Controller
const findUserReviews = async (req, res, next) => {
  // query data
  const id = req.query.id;
  const page = req.query.page || defaultValues.page;
  const limit = req.query.limit || defaultValues.limit;
  const sortType = req.query.sort_type || defaultValues.sortType;
  const sortBy = req.query.sort_by || defaultValues.sortBy;
  const search = req.query.search || defaultValues.search;

  // Using Find All user reviews service
  try {
    const reviews = await userService.findUserReviews(id, {
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    // data transformation
    const data = query.transformItems({
      items: reviews,
      path: '/reviews',
      selection: [
        'id',
        'movieId',
        'userId',
        'poster',
        'rating',
        'text',
        'createdAt',
        'updatedAt',
      ],
    });

    // pagination
    const totalItems = await userService.countUserReviews({ search });
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

module.exports = findUserReviews;
