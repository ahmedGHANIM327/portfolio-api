const User = require('../models/users');

const usersService = (() => {
  const createUser = async (data) => {
    const user = new User(data);
    return await user.save();
  };

  const updateUserName = async (newName) => {
    const user = await User.findOneAndUpdate({ fullName: newName }, { new: true });
    return user;
  };

  const updateUserEmail = async (newEmail) => {
    const user = await User.findOneAndUpdate({ email: newEmail }, { new: true });
    return user;
  };

  const updateUserPassword = async (newPassword) => {
    const user = await User.findOneAndUpdate({ password: newPassword }, { new: true });
    return user;
  };

  const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
  };

  return {
    createUser,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
    getUserByEmail
  };
})();

module.exports = usersService;
