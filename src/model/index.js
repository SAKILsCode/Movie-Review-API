/**
 * Title: Schema Models
 * Description: contains models of all available entities in DB, these model are use to make operation on DB.
 */

const User = require('./User')
const Movie = require('./Movie')
const Review = require('./Review')

module.exports = {
  User,
  Movie,
  Review
}