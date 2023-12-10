const express = require('express');
const interestsController = require('../controllers/interests.controller');
const multer = require('multer');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.post('/', upload.single('photo'), interestsController.addOne);
router.get('/:id', interestsController.getById);
router.get('/', interestsController.getAll);
router.put('/:id', upload.single('photo'), interestsController.updateOne);
router.delete('/:id', interestsController.delOne);

module.exports = router;
