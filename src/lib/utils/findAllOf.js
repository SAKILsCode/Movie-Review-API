const { Model } = require('mongoose');
const defaults = require('../../config/defaults');

/**
 * Find documents of a collection (Movie or Review) of a author
 * @param {String} authorId
 * @param {Model} Model
 * @param {Object} queryParams
 * @returns {Array}
 */
const findAllof = async (
  authorId,
  Model,
  {
    page = defaults.page,
    limit = defaults.limit,
    sortType = defaults.sortType,
    sortBy = defaults.sortBy,
    search = defaults.search,
  }
) => {
  // generating sorting string (e.g. -updatedAt for sortType dsc)
  const sortStr = `${sortType === 'dsc' ? '-' : ''}${sortBy}`;

  // case insensitive search with search and authorId in MongoDB query
  const filter = {
    title: { $regex: search, $options: 'i' },
    authorId: { $regex: authorId, $options: 'i' },
  };

  try {
    const data = await Model.find(filter)
      .sort(sortStr)
      .skip(page * limit - limit)
      .limit(limit);

    return data.map((singleData) => ({
      ...singleData._doc,
      id: singleData.id,
    }));
  } catch (error) {
    throw error;
  }
};

module.exports = findAllof;
