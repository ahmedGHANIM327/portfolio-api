const express = require('express');
const languagesController = require('../controllers/languages.controller');

const router = express.Router();

// Define routes
router.post('/', languagesController.addOne);
router.get('/:id', languagesController.getById);
router.get('/', languagesController.getAll);
router.put('/:id', languagesController.updateOne);
router.delete('/:id', languagesController.delOne);

module.exports = router;
