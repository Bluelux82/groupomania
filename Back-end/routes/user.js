const express = require('express');
const authController = require('../controllers/auth')
const auth = require('../middleware/auth')

const router = express.Router();

// All routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', auth, authController.profile);

module.exports = router;