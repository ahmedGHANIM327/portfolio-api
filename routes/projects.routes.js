const express = require('express');
const projectsController = require('../controllers/projects.controller');
const multer = require('multer');
const userAuthMiddleware = require('../middleware/userAuthMiddleware');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.post('/', userAuthMiddleware, upload.single('image'), projectsController.addOne);
router.get('/user', userAuthMiddleware, projectsController.getUserProjects);
router.get('/:id', userAuthMiddleware, projectsController.getById);
router.get('/', projectsController.getAll);
router.put('/:id', userAuthMiddleware, upload.single('image'), projectsController.updateOne);
router.delete('/:id', userAuthMiddleware, projectsController.delOne);

module.exports = router;
