const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();


// form submission
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
module.exports = router;