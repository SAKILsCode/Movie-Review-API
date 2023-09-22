const { verifyToken } = require('../lib/token');
const { findUserByEmail } = require('../lib/user');
const { authorizationError } = require('../utils/error');

const authenticate = async (req, _res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = await verifyToken({ token });
    const user = await findUserByEmail(decoded.email);
    if (!user) throw authorizationError();

    req.user = { ...user._doc, id: user.id };
    next();
  } catch (error) {
    console.log('[Authentication Middleware Error]: ', error);
    next(authorizationError());
  }
};

module.exports = authenticate;
