const jwt = require('jsonwebtoken');

const jwtService = (() => {
  const generateUserAuthToken = (data) => {
    return jwt.sign(data, process.env.JWT_PRIVATE_KEY);
  };

  const generateUserActivationToken = (data) => {
    return jwt.sign(data, process.env.JWT_PRIVATE_KEY, { expiresIn: '24h' });
  };

  const generateUserResetPasswordToken = (data) => {
    return jwt.sign(data, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
  };

  const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  };

  return {
    generateUserAuthToken,
    generateUserActivationToken,
    generateUserResetPasswordToken,
    verifyToken
  };
})();

module.exports = jwtService;
