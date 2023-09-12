const findAllUsers = require('./findAllUser')
const findSingleUser = require('./findSingleUser')
const createUser = require('./createUser')
const updateUser = require('./updateUser')
const deleteUser = require('./deleteUser')
const findUserMovies = require('./findUserMovies')
const findUserReviews = require('./findUserReviews')

module.exports = {
  findAllUsers,
  findSingleUser,
  createUser,
  updateUser,
  deleteUser,
  findUserMovies,
  findUserReviews
}