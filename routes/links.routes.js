const express = require('express');
const linksController = require('../controllers/links.controller');

const router = express.Router();

// Define routes
router.post('/', linksController.addOne);
router.get('/:id', linksController.getById);
router.get('/', linksController.getAll);
router.put('/:id', linksController.updateOne);
router.delete('/:id', linksController.delOne);

module.exports = router;
