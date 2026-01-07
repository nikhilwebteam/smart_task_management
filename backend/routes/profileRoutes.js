const express = require('express');
const router = express.Router();
const { handleUserProfile } = require('../controllers/profile.controller.js');
const { handleChangePassword } = require('../controllers/profile.controller.js');

// Route to get user profile
router.get('/profile', handleUserProfile);
router.put('/profile/password', handleChangePassword);

module.exports = router;