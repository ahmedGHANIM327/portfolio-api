const express = require('express');
const experiencesController = require('../controllers/experiences.controller');
const userAuthMiddleware = require('../middleware/userAuthMiddleware');

const router = express.Router();

// Define routes
router.post('/', userAuthMiddleware, experiencesController.addOne);
router.get('/user', userAuthMiddleware, experiencesController.getUserExperiences);
router.get('/:id', userAuthMiddleware, experiencesController.getById);
router.get('/', experiencesController.getAll);
router.put('/:id', userAuthMiddleware, experiencesController.updateOne);
router.delete('/:id', userAuthMiddleware, experiencesController.delOne);

module.exports = router;
