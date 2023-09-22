const bcrypt = require('bcryptjs');

/**
 * Generate hash from plain string
 * @param {String} plainString 
 * @param {Number} saltRound 
 * @returns {Promise} Promise
 */
const generateHash = async (plainString, saltRound = 10) => {
  const salt = await bcrypt.genSalt(saltRound);
  return bcrypt.hash(plainString, salt);
};

/**
 * Compare hash with plain string
 * @param {String} plainString 
 * @param {String} hash 
 * @returns {Promise} Promise
 */
const compareHash = async (plainString, hash) => {
  return bcrypt.compare(plainString, hash);
};

module.exports = {
  generateHash,
  compareHash,
};
