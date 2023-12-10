const express = require('express');
const certeficationstController = require('../controllers/certefications.controller');
const multer = require('multer');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.post('/', upload.single('file'), certeficationstController.addOne);
router.get('/:id', certeficationstController.getById);
router.get('/', certeficationstController.getAll);
router.put('/:id', upload.single('file'), certeficationstController.updateOne);
router.delete('/:id', certeficationstController.delOne);

module.exports = router;
