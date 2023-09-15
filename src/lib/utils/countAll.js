const { Model } = require('mongoose');
const { search: defaultSearch } = require('../../config/defaults');
const { User } = require('../../model');

/**
 * Count all document of a collection
 * @param {Model} Model
 * @param {String} searchTerm
 * @param {String} authorId
 * @returns {Promise}
 */
const countAll = async (Model, searchTerm = defaultSearch, authorId = '') => {
  let filter = {
    title: { $regex: searchTerm, $options: 'i' },
  };

  if (Model === User) {
    filter = {
      username: { $regex: searchTerm, $options: 'i' },
    };
  }

  if (authorId) {
    filter.authorId = { $regex: authorId, $options: 'i' };
  }

  return Model.count(filter);
};

module.exports = countAll;
