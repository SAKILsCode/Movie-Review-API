const { Model } = require('mongoose');

/**
 * Delete filtered documents of a collection
 * @param {Model} Model
 * @param {Object} filterObject
 */
const deleteAllOf = async (
  Model,
  filterObject
) => {

  // case insensitive search in MongoDB query
  const filter = {};
  Object.keys(filterObject).forEach((key) => {
    if (key) filter[key] = { $regex: filterObject[key], $options: 'i' };
  });

  const data = await Model.find(filter)

  data.map(async (item) => {
    await Model.findByIdAndDelete(item.id)
  });
};

module.exports = deleteAllOf;
