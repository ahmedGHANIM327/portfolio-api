const usersWithoutPasswords = require('./usersWithoutPasswords');
const handleLoginStatus = require('./handleLoginStatus');

module.exports = {
  ...usersWithoutPasswords,
  handleLoginStatus
};
