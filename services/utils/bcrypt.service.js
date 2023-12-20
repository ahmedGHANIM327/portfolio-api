const bcrypt = require('bcrypt');

const bcryptService = (() => {
  const bcryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  };

  const comparePasswords = async (pass1, pass2) => {
    const validPassword = await bcrypt.compare(pass1, pass2);
    return validPassword;
  };

  return {
    bcryptPassword,
    comparePasswords
  };
})();

module.exports = bcryptService;
