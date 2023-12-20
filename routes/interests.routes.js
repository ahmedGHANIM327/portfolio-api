const express = require('express');
const interestsController = require('../controllers/interests.controller');
const multer = require('multer');
const userAuthMiddleware = require('../middleware/userAuthMiddleware');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.post('/', userAuthMiddleware, upload.single('photo'), interestsController.addOne);
router.get('/user', userAuthMiddleware, interestsController.getUserInterests);
router.get('/:id', userAuthMiddleware, interestsController.getById);
router.get('/', interestsController.getAll);
router.put('/:id', userAuthMiddleware, upload.single('photo'), interestsController.updateOne);
router.delete('/:id', userAuthMiddleware, interestsController.delOne);

module.exports = router;
