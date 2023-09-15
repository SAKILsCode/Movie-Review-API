const defaults = require('../config/defaults');
const { badRequest } = require('./error');

/**
 * Generate Query string from query object
 * @param {Object} query
 * @returns {String}
 */
const getQueryString = (query) => {
  return Object.keys(query)
    .map(
      (key) => encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
    )
    .join('&');
};

/**
 * Modify and return items data
 * @param {Object} param
 * @returns {Array}
 */
const transformItems = ({ items = [], path = '/', selection = [] }) => {
  if (!Array.isArray(items) || !Array.isArray(selection))
    throw badRequest('Invalid selections...');

  if (selection.length === 0)
    return items.map((item) => ({ ...item, link: `${path}/${item.id}` }));

  return items.map((item) => {
    const result = {};
    selection.forEach((key) => {
      result[key] = item[key];
    });

    result.link = `${path}/${item.id}`;
    return result;
  });
};

/**
 * Pagination data using currentPage, limit, totalItems
 * @param {Object} params
 * @returns {Object}
 */
const getPagination = ({
  page = defaults.page,
  limit = defaults.limit,
  totalItems = defaults.totalItems,
}) => {
  const pagination = {
    page,
    limit,
    totalItems,
  };

  pagination.totalPage = Math.ceil(totalItems / limit);
  if (page < pagination.totalPage) pagination.nextPage = page + 1;
  if (page > 1) pagination.prevPage = page - 1;

  return pagination;
};

/**
 * Generating HATEOAS links
 * @param {Object} param0
 * @returns {Object}
 */
const allItemsHATEOAS = ({
  path = '',
  query = {},
  hasNext = false,
  hasPrev = false,
  page = 1,
}) => {
  const links = {
    self: path,
  };

  if (hasNext) {
    const queryString = getQueryString({ ...query, page: page + 1 });
    links.next_page = `${path}?${queryString}`;
  }
  if (hasPrev) {
    const queryString = getQueryString({ ...query, page: page - 1 });
    links.prev_page = `${path}?${queryString}`;
  }

  return links;
};

module.exports = {
  getQueryString,
  transformItems,
  getPagination,
  allItemsHATEOAS,
};
