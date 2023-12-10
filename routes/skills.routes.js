const express = require('express');
const skillsController = require('../controllers/skills.controller');
const multer = require('multer');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.post('/', upload.single('icon'), skillsController.addOne);
router.get('/:id', skillsController.getById);
router.get('/', skillsController.getAll);
router.put('/:id', upload.single('icon'), skillsController.updateOne);
router.delete('/:id', skillsController.delOne);

module.exports = router;
