const { path, not, propEq } = require('ramda');
const jwtService = require('../services/utils/jwt.service');
const userService = require('../services/users.service');

const userAuthMiddleware = async (req, res, next) => {
  const token = path(['session', 'token'], req);

  if (!token) {
    throw new Error('UNAUTHORIZED');
  }

  // Verify the token
  const { _id: id } = jwtService.verifyToken(token, process.env.JWT_PRIVATE_KEY);

  const user = await userService.getUserById(id);

  if (!user || not(propEq('ACTIVE', 'status', user))) {
    throw new Error('UNAUTHORIZED');
  }

  req.currentUser = id;
  next();
};

module.exports = userAuthMiddleware;
