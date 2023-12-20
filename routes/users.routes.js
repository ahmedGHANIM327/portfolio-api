const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router();

// Define routes
router.post('/', usersController.createUser);
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUser);
router.put('/status/:id', usersController.updateUserStatus);
router.put('/name/:id', usersController.updateUserName);
router.put('/password/:id', usersController.updateUserPassword);
router.post('/requestresetpassword', usersController.requestResetPassword);
router.put('/resetpassword/:token', usersController.resetUserPassword);
router.delete('/:id', usersController.delUser);
router.post('/login', usersController.userLogin);
router.post('/logout', usersController.userLogOut);

module.exports = router;
