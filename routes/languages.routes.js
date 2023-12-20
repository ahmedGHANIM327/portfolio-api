const express = require('express');
const languagesController = require('../controllers/languages.controller');
const userAuthMiddleware = require('../middleware/userAuthMiddleware');

const router = express.Router();

// Define routes
router.post('/', userAuthMiddleware, languagesController.addOne);
router.get('/user', userAuthMiddleware, languagesController.getUserLanguages);
router.get('/:id', userAuthMiddleware, languagesController.getById);
router.get('/', languagesController.getAll);
router.put('/:id', userAuthMiddleware, languagesController.updateOne);
router.delete('/:id', userAuthMiddleware, languagesController.delOne);

module.exports = router;
