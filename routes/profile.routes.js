const express = require('express');
const profileController = require('../controllers/profile.controller');
const multer = require('multer');
const userAuthMiddleware = require('../middleware/userAuthMiddleware');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.post('/', userAuthMiddleware, upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), profileController.createProfile);
router.get('/user', userAuthMiddleware, profileController.getProfile);
router.get('/', profileController.getAllProfiles);
router.put('/', userAuthMiddleware, upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), profileController.updateProfile);

module.exports = router;
