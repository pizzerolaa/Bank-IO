const express = require('express');
const { registerUser, loginUser, verifyCode } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/verify', verifyCode);

module.exports = router;