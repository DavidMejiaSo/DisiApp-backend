const express = require('express');
const router = express.Router(); // Crear una instancia del router de Express
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Resto del código de la ruta de inicio de sesión...


router.post('/', async (req, res) => {
    try {
        // Obtener datos del cuerpo de la solicitud
        const { email, password } = req.body;

        // Buscar el usuario por su email en la base de datos
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Comparar la contraseña proporcionada con la contraseña almacenada
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }


        res.json({ msg: 'Inicio de sesión exitoso' ,user:user});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
});
module.exports = router;