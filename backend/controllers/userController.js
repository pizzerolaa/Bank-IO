const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

//registro de usuarios
const registerUser = async (req, res) => {
    const { name, lastName, rfc, email, password } = req.body;

    try {
        //validamos que no exista el usuario
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return res.status(400).json({ message: 'Usuario ya registrado' });
        }

        //encriptamos la contraseña 
        const hashedPassword = await bcrypt.hash(password, 10);

        //creamos el usuario
        const user = new User({
            name,
            lastName,
            rfc,
            email,
            password: hashedPassword
        });

        //guardamos el usuario en la db
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser };


// login de usuarios
const loginUser = async (req, res) => {
     const {email, password} = req.body;

     //validamos que exista el usuario
     const user = await User
         .findOne({ email })
         .select('+password');
    
     if (!user) {
         return res.status(404).json({message: 'Usuario no encontrado'});
     }

     //validamos la contraseña
     const passwordMatch = await bcrypt.compare(password, user.password);
     if (!passwordMatch) {
         return res.status(401).json({message: 'Contraseña incorrecta'});
     }

     res.json(user);
}

module.exports = { registerUser, loginUser };