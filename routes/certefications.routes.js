const express = require('express');
const certeficationstController = require('../controllers/certefications.controller');
const multer = require('multer');
const userAuthMiddleware = require('../middleware/userAuthMiddleware');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.post('/', userAuthMiddleware, upload.single('file'), certeficationstController.addOne);
router.get('/user', userAuthMiddleware, certeficationstController.getUserCertefications);
router.get('/:id', userAuthMiddleware, certeficationstController.getById);
router.get('/', certeficationstController.getAll);
router.put('/:id', userAuthMiddleware, upload.single('file'), certeficationstController.updateOne);
router.delete('/:id', userAuthMiddleware, certeficationstController.delOne);

module.exports = router;
