const { Model } = require('mongoose');

/**
 * Count all document of a collection
 * @param {Model} Model
 * @param {Object} filterObject
 * @returns {Promise}
 */
const countAll = async (Model, filterObject = {}) => {
  // case insensitive search in MongoDB query
  const filter = {};
  Object.keys(filterObject).forEach((item) => {
    if(item) filter[item] = { $regex: filterObject[item], $options: 'i' };
  });

  return Model.count(filter);
};

module.exports = countAll;
