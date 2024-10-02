const express = require('express');
const { registerUser, loginUser, getUserById } = require('../controllers/userController');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para obtener un usuario por ID 
router.get('/user/:id', getUserById); 

module.exports = router;
