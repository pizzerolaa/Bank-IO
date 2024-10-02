const express = require('express');
const { registerUser, loginUser, verifyCode, getUserById } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/verify', verifyCode);

router.get('/user/:id', getUserById); 

module.exports = router;