const userService = require('../services/users.service');
const bcryptService = require('../services/utils/bcrypt.service');
const jwtService = require('../services/utils/jwt.service');
const { prop, path, pick } = require('ramda');
const {
  getUserWithoutPassword,
  getUsersWithoutPasswords,
  handleLoginStatus
} = require('../util/users');
const {
  validateUserData,
  validateUserStatus,
  validateUserName,
  validateUserPassword,
  validateUserEmail,
  validateId
} = require('../validation');

const usersController = (() => {
  // Create user
  const createUser = async (req, res) => {
    const data = prop('body', req);

    // Validate user data
    validateUserData(data);

    // check if email exists
    const existingUser = await userService.getUserByEmail(prop('email', data));
    if (existingUser) throw new Error('EMAIL_ALREADY_EXISTS');

    // hash password
    const hashedPassword = await bcryptService.bcryptPassword(prop('password', data));

    // save user to db
    const userData = {
      ...data,
      password: hashedPassword
    };

    const user = await userService.createUser(userData);

    res.status(200).json({ ok: true, data: user, success: 'USER_CREATED_SUCCESSFULY' });
  };

  const getUser = async (req, res) => {
    const id = path(['params', 'id'], req);

    // validate user Id
    validateId(id);

    // set user status
    const user = await userService.getUserById(id);
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    res.status(200).json({ ok: true, data: getUserWithoutPassword(user) });
  };

  // List all users
  const getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();

    res.status(200).json({ ok: true, data: getUsersWithoutPasswords(users) });
  };

  // Updates user
  const updateUserName = async (req, res) => {
    const id = path(['params', 'id'], req);

    // validate user Id
    validateId(id);

    const newName = path(['body', 'name'], req);

    // validate new status
    validateUserName(newName);

    // set user status
    const user = await userService.updateUserName(id, newName);
    if (!user) {
      throw new Error('CAN\'T_UPDATE_USER_NAME');
    }

    res.status(200).json({ ok: true, success: 'USER_NAME_UPDATED_SUCCESSFULY' });
  };

  // Activate user
  const updateUserPassword = async (req, res) => {
    const id = path(['params', 'id'], req);

    // validate user Id
    validateId(id);

    const user = await userService.getUserById(id);
    if (!user) throw new Error('USER_NOT_FOUND');

    const { newPassword, oldPassword } = prop('body', req);

    // Validate new Password
    validateUserPassword(newPassword);

    // validate old password
    validateUserPassword(oldPassword);

    // Compare password
    const validPassword = await bcryptService.comparePasswords(oldPassword, prop('password', user));
    if (!validPassword) throw new Error('INCORRECT_PASSWORD');

    // hash password
    const hashedPassword = await bcryptService.bcryptPassword(newPassword);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ ok: true, success: 'USER_PASSWORD_UPDATED_SUCCESSFULY' });
  };

  // Activate user
  const updateUserStatus = async (req, res) => {
    const id = path(['params', 'id'], req);

    // validate user Id
    validateId(id);

    const newStatus = path(['body', 'status'], req);

    // validate new status
    validateUserStatus(newStatus);

    // set user status
    const user = await userService.updateUserStatus(id, newStatus);
    if (!user) {
      throw new Error('CAN\'T_UPDATE_USER_STATUS');
    }

    res.status(200).json({ ok: true, success: 'USER_STATUS_UPDATED_SUCCESSFULY' });
  };

  const requestResetPassword = async (req, res) => {
    const email = path(['body', 'email'], req);

    // Validate user email
    validateUserEmail(email);

    // get user by email
    const user = await userService.getUserByEmail(email);
    if (!user) throw new Error('USER_NOT_FOUND');

    // generate and return jwt token that contains ( userId ) for account activation
    const token = jwtService.generateUserResetPasswordToken(pick(['_id'], user));

    // Send url with token to email user

    res.status(200).json({ ok: true, data: token, success: 'RESET_PASSWORD_EMAIL_SENT' });
  };

  const resetUserPassword = async (req, res) => {
    const token = path(['params', 'token'], req);
    const newPassword = path(['body', 'password'], req);

    const { _id: id } = jwtService.verifyToken(token);

    // Get & validate userId
    validateId(id);

    const user = await userService.getUserById(id);
    if (!user) throw new Error('USER_NOT_FOUND');

    // Validate password
    validateUserPassword(newPassword);

    // hash password
    const hashedPassword = await bcryptService.bcryptPassword(newPassword);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ ok: true, success: 'PASSWORD_RESET_SUCCESSFULY!' });
  };

  const delUser = async (req, res) => {
    const id = path(['params', 'id'], req);

    // validate user Id
    validateId(id);

    const user = await userService.delUserById(id);
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    res.status(200).json({ ok: true, success: 'USER_DELETED_SUCCESSFULY' });
  };

  const userLogin = async (req, res) => {
    const { email, password } = prop('body', req);

    // Get & validate user email
    validateUserEmail(email);

    // Get user By Email
    const user = await userService.getUserByEmail(email);
    if (!user) throw new Error('USER_NOT_FOUND');

    const validPassword = await bcryptService.comparePasswords(password, prop('password', user));
    if (!validPassword) throw new Error('INCORRECT_PASSWORD');

    handleLoginStatus(prop('status', user));

    // generate auth token
    const token = jwtService.generateUserAuthToken(pick(['_id'], user));

    req.session.token = token;

    res.status(200).json({ ok: true, token, success: 'USER_LOGGED_SUCCESSFULY' });
  };

  const userLogOut = async (req, res) => {
    req.session.destroy(err => {
      if (err) throw new Error('ERROR_LOGGING_OUT');

      res.status(200).json({ ok: true, success: 'LOGOUT_SUCCESSFULY' });
    });
  };

  return {
    createUser,
    updateUserStatus,
    getUser,
    getAllUsers,
    updateUserName,
    updateUserPassword,
    requestResetPassword,
    resetUserPassword,
    delUser,
    userLogin,
    userLogOut
  };
})();

module.exports = usersController;
