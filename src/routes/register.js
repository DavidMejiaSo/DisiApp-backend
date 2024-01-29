const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.post('/', async (req, res) => {
    try {
        const { name, email, password, rol, redes_sociales, disponibilidad } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'El usuario ya está registrado' });
        }

        user = new User({
            name,
            email,
            password,
            rol,
            redes_sociales,
            disponibilidad
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Deja el campo token_auth vacío por ahora
        user.token_auth = '';

        // Guardar el usuario en la base de datos
        await user.save();

        res.json({ msg: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
});

module.exports = router;
