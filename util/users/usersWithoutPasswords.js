const { map, omit } = require('ramda');

const getUsersWithoutPasswords = map(
  omit(['password'])
);

const getUserWithoutPassword = omit(['password']);

module.exports = {
  getUserWithoutPassword,
  getUsersWithoutPasswords
};
