const express = require('express');
const skillsController = require('../controllers/skills.controller');
const multer = require('multer');
const userAuthMiddleware = require('../middleware/userAuthMiddleware');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.post('/', userAuthMiddleware, upload.single('icon'), skillsController.addOne);
router.get('/user', userAuthMiddleware, skillsController.getUserSkills);
router.get('/:id', userAuthMiddleware, skillsController.getById);
router.get('/', skillsController.getAll);
router.put('/:id', userAuthMiddleware, upload.single('icon'), skillsController.updateOne);
router.delete('/:id', userAuthMiddleware, skillsController.delOne);

module.exports = router;
