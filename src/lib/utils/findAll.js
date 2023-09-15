const { Model } = require('mongoose');
const defaults = require('../../config/defaults');
const { Movie, User, Review } = require('../../model');

/**
 * Find documents of a collection
 * @param { Model } Model
 * @param { Object } queryParams
 * @returns { Array }
 */
const findAll = async (
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
  
  // case insensitive title search in MongoDB query
  let filter = {
    title: { $regex: search, $options: 'i' },
  };
  
  console.log(Model === Review && 'This is Review_________');
  console.log(Model === Movie && 'This is Movie_________');
  console.log(Model === User && 'This is User_________');
  if (Model === User) {
    filter = {
      username: { $regex: search, $options: 'i' },
    };
  }
  
  console.log(Model === User && 'This is User_________');
  const data = await Model.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return data.map((singleData) => ({
    ...singleData._doc,
    id: singleData.id,
  }));
};

module.exports = findAll;
