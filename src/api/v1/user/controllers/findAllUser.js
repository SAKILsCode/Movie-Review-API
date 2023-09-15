// Import external services and dependencies
const { query } = require('../../../../utils');
const { findAll, count } = require('../../../../lib/user');
const defaults = require('../../../../config/defaults');



// Find all users Controller
const findAllUsers = async (req, res, next) => {
  // query data
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;

  // Using Find All service
  try {
    const users = await findAll({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    
    // data transformation
    const data = query.transformItems({
      items: users,
      path: req.path,
      selection: [
        'id',
        'username',
        'email',
        'role',
        'totalRated',
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

module.exports = findAllUsers;


