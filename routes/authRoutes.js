const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/users/signup', authController.registerUser);
router.post('/users/login', authController.loginUser);

module.exports = router;
