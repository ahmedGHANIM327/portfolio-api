const express = require('express');
const educationsController = require('../controllers/educations.controller');
const multer = require('multer');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.post('/', upload.single('diploma'), educationsController.addOne);
router.get('/:id', educationsController.getById);
router.get('/', educationsController.getAll);
router.put('/:id', upload.single('diploma'), educationsController.updateOne);
router.delete('/:id', educationsController.delOne);

module.exports = router;
