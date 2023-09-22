const { authorizationError } = require('../utils/error');

/**
 * Authorization middleware (match logged user role with allowed roles)
 * @param {Array} roles 
 * @returns middleware
 */
const authorize =
  (roles = []) =>
  (req, _res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    return next(authorizationError());
  };

module.exports = authorize;
