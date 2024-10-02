const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Registro de usuarios
const registerUser = async (req, res) => {
    const { name, lastName, rfc, email, password } = req.body;

    try {
        // Validamos que no exista el usuario
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return res.status(400).json({ message: 'Usuario ya registrado' });
        }

        // Encriptamos la contraseña 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creamos el usuario
        const user = new User({
            name,
            lastName,
            rfc,
            email,
            password: hashedPassword
        });

        // Guardamos el usuario en la db
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login de usuarios
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Responder con datos del usuario, incluyendo el ID
        res.json({
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
    const { id } = req.params; // Asumimos que el ID se pasa como parámetro en la URL

    try {
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Enviar solo la información necesaria
        res.json({
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserById };
