const handleLoginStatus = (status) => {
  // user is not active yet
  if (status === 'WAITING') {
    throw new Error('USER_IS_WAITING');
  }

  // user is blocked
  if (status === 'BLOCKED') {
    throw new Error('USER_IS_BLOCKED');
  }
};

module.exports = handleLoginStatus;
