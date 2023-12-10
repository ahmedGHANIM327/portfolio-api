const express = require('express');
const profileController = require('../controllers/profile.controller');
const multer = require('multer');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.post('/', upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), profileController.createProfile);
router.get('/', profileController.getProfile);
router.put('/', upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), profileController.updateProfile);

module.exports = router;
