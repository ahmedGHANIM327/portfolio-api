const express = require('express');
const apikeysController = require('../controllers/apikeys.controller');
const userAuthMiddleware = require('../middleware/userAuthMiddleware');

const router = express.Router();

// Define routes
router.post('/', userAuthMiddleware, apikeysController.addOne);
router.get('/user', userAuthMiddleware, apikeysController.getUserApiKeys);
router.get('/:id', userAuthMiddleware, apikeysController.getById);
router.get('/', apikeysController.getAll);
router.put('/:id', userAuthMiddleware, apikeysController.updateOne);
router.delete('/:id', userAuthMiddleware, apikeysController.delOne);

module.exports = router;
