const express = require('express');
const educationsController = require('../controllers/educations.controller');
const multer = require('multer');
const userAuthMiddleware = require('../middleware/userAuthMiddleware');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.post('/', userAuthMiddleware, upload.single('diploma'), educationsController.addOne);
router.get('/user', userAuthMiddleware, educationsController.getUserEducations);
router.get('/:id', userAuthMiddleware, educationsController.getById);
router.get('/', educationsController.getAll);
router.put('/:id', userAuthMiddleware, upload.single('diploma'), educationsController.updateOne);
router.delete('/:id', userAuthMiddleware, educationsController.delOne);

module.exports = router;
