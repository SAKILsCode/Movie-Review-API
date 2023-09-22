const { Model } = require('mongoose');
const defaults = require('../../config/defaults');

/**
 * Find filtered documents of a collection
 * @param {Model} Model
 * @param {Object} filterObject
 * @param {Object} queryParams
 * @returns {Array}
 */
const findAllOf = async (
  Model,
  filterObject,
  {
    page = defaults.page,
    limit = defaults.limit,
    sortType = defaults.sortType,
    sortBy = defaults.sortBy,
  }
) => {
  // generating sorting string (e.g. -updatedAt for sortType dsc)
  const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;

  // case insensitive search in MongoDB query
  const filter = {};
  Object.keys(filterObject).forEach((key) => {
    if (key) filter[key] = { $regex: filterObject[key], $options: 'i' };
  });

  const data = await Model.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return data.map((singleData) => ({
    ...singleData._doc,
    id: singleData.id,
  }));
};

module.exports = findAllOf;
