const { prop, propEq, not } = require('ramda');
const apikeyService = require('../services/apikeys.service');
const userService = require('../services/users.service');

const apikeyAuthMiddleware = async (req, res, next) => {
  const key = prop('apiKey', req);

  if (!key) {
    throw new Error('UNAUTHORIZED');
  }

  const apikey = await apikeyService.getByKey(key);

  if (!apikey) {
    throw new Error('UNAUTHORIZED');
  }

  const user = await userService.getUserById(prop('user', apikey));

  if (not(propEq('ACTIVE', 'status', user))) throw new Error('UNAUTHORIZED');

  req.currentUser = prop('user', apikey);
  next();
};

module.exports = apikeyAuthMiddleware;
