const express = require('express');
const experiencesController = require('../controllers/experiences.controller');

const router = express.Router();

// Define routes
router.post('/', experiencesController.addOne);
router.get('/:id', experiencesController.getById);
router.get('/', experiencesController.getAll);
router.put('/:id', experiencesController.updateOne);
router.delete('/:id', experiencesController.delOne);

module.exports = router;
