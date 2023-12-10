const express = require('express');
const projectsController = require('../controllers/projects.controller');
const multer = require('multer');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.post('/', upload.single('image'), projectsController.addOne);
router.get('/:id', projectsController.getById);
router.get('/', projectsController.getAll);
router.put('/:id', upload.single('image'), projectsController.updateOne);
router.delete('/:id', projectsController.delOne);

module.exports = router;
