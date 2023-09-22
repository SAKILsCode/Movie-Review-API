/**
 * Title: Profile Service
 * Description: This file contains all the business logics and service functions need to implement all the actions on Profile resource.
 *
 * DEV NOTE: profile id is the same as User id and all operation will be on the User entity.
 * Create update and delete on User entity is admin only operation, and Register action + Profile section is the users operation on User entity.
 */

// Dependencies and Imports
const { authenticationError } = require('../../utils/error');
const { update: updateUser, deleteOne: deleteUser } = require('../user');
const { mongooseIdValidator } = require('../utils');

/**
 * Update a user Profile
 * @param {String} loggedInUserId
 * @param {Object} reqObject
 * @returns {Promise}
 */
const updateProfile = (loggedInUserId, { username, email, password }) => {
  if (!loggedInUserId) throw authenticationError('User not logged in.');
  if (!mongooseIdValidator(loggedInUserId)) throw badRequest('Invalid Profile Id.');

  return updateUser(loggedInUserId, { username, email, password });
};

/**
 * Delete a user Profile
 * @param {String} loggedInUserId
 * @returns {Promise}
 */
const deleteProfile = (loggedInUserId) => {
  if (!loggedInUserId) throw authenticationError('User not logged in.');
  if (!mongooseIdValidator(loggedInUserId)) throw badRequest('Invalid Profile Id.');

  return deleteUser(loggedInUserId);
};

module.exports = {
  updateProfile,
  deleteProfile,
};
