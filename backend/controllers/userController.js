const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mailjet = require('node-mailjet')
    .apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
const crypto = require('crypto');

const generateVerificationCode = () => {
    return crypto.randomInt(100000, 999999).toString();
};

const sendVerificationEmail = async (email, code) => {
    try{
        const request = mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: 'fherg.0711@gmail.com',
                        Name: 'Equipo de desarrollo Bank-IO',
                    },
                    to: [
                        {
                            Email: email,
                            User: 'Usuario',
                        },
                    ],
                    Subject: 'Verificación de correo electrónico',
                    TextPart: `Código de verificación es: {${code}}`,
                    HTMLPart: `<h3>Tu código de verificación es:</h3><p><strong>${code}</strong></p>`,
                },
            ],
        });
        const response = await request;
        console.log(response.body);
    } catch (error) {
        console.log('Error al enviar el correo de verificación', error);
        throw new Error('Error al enviar el correo de verificación');
    }
};

//registro de usuarios
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

        // Generamos un código de verificación
        const verificationCode = generateVerificationCode();

        // Creamos el usuario
        const user = new User({
            name,
            lastName,
            rfc,
            email,
            password: hashedPassword,
            verificationCode, // Guardamos el código de verificación
            verificationCodeExpires: Date.now() + 3600000, // Expira en 1 hora
        });

        // Guardamos el usuario en la base de datos
        await user.save();

        // Enviamos el correo de verificación
        await sendVerificationEmail(email, verificationCode);

        res.status(201).json({ message: 'Usuario registrado. Código de verificación enviado.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// login de usuarios
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    if (!user.verificationCode || user.verificationCodeExpires < Date.now()) {
        return res.status(401).json({ message: 'Código de verificación requerido' });
    }

    res.json({ message: 'Login exitoso. Código de verificación enviado.' });
};

const verifyCode = async (req, res) => {
    const {email, code} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    //verificamos que el código sea correcto y que no haya expirado
    if (user.verificationCode === code && user.verificationCodeExpires > Date.now()) {
        //codigo correcto , eliminamos el código de verificación
        user.verificationCode = null;
        user.verificationCodeExpires = null;
        await user.save();

        return res.status(200).json({ message: 'Verificación exitosa' });
    } else {
        return res.status(400).json({ message: 'Código incorrecto o expirado' });
    }
};

module.exports = { registerUser, loginUser, verifyCode };