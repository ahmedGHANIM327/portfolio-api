const { or, not } = require('ramda');
const userAuthMiddleware = require('./userAuthMiddleware');
const apikeyAuthMiddleware = require('./apikeyAuthMiddleware');

const userOrApikeyAuthMiddleware = (req, res, next) => {
  const isAuthOrApiKeyValid = or(userAuthMiddleware(req, res), apikeyAuthMiddleware(req, res));

  if (not(isAuthOrApiKeyValid)) throw new Error('UNAUTHORIZED');

  next();
};

module.exports = userOrApikeyAuthMiddleware;
