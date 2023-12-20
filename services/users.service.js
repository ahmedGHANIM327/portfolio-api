const User = require('../models/users');

const usersService = (() => {
  const createUser = async (data) => {
    const user = new User(data);
    return await user.save();
  };

  const updateUserName = async (id, newName) => {
    const user = await User.findByIdAndUpdate(id, { fullName: newName }, { new: true });
    return user;
  };

  const updateUserEmail = async (id, newEmail) => {
    const user = await User.findByIdAndUpdate(id, { email: newEmail }, { new: true });
    return user;
  };

  const updateUserPassword = async (id, newPassword) => {
    const user = await User.findByIdAndUpdate(id, { password: newPassword }, { new: true });
    return user;
  };

  const updateUserStatus = async (id, newStatus) => {
    const user = await User.findByIdAndUpdate(id, { status: newStatus }, { new: true });
    return user;
  };

  const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
  };

  const getAllUsers = async () => {
    const users = await User.find();
    return users;
  };

  const getUserById = async (id) => {
    const user = await User.findById(id);
    return user;
  };

  const delUserById = async (id) => {
    const user = await User.findByIdAndDelete(id);
    return user;
  };

  return {
    createUser,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
    getUserByEmail,
    updateUserStatus,
    getUserById,
    getAllUsers,
    delUserById
  };
})();

module.exports = usersService;
