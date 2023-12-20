const express = require('express');
const linksController = require('../controllers/links.controller');
const userAuthMiddleware = require('../middleware/userAuthMiddleware');

const router = express.Router();

// Define routes
router.post('/', userAuthMiddleware, linksController.addOne);
router.get('/user', userAuthMiddleware, linksController.getUserLinks);
router.get('/:id', userAuthMiddleware, linksController.getById);
router.get('/', linksController.getAll);
router.put('/:id', userAuthMiddleware, linksController.updateOne);
router.delete('/:id', userAuthMiddleware, linksController.delOne);

module.exports = router;
