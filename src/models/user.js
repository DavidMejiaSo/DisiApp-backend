const mongoose = require('mongoose');

// Definir el esquema del usuario
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        unique: true
    },
    redes_sociales: {
        type: Object,
        default: {}
    },
    disponibilidad: {
        type: Array,
        default: []
    },
    token_auth: {
        type: String,
       
    }
    ,
    date: {
        type: Date,
        default: Date.now
    }
});

// Crear y exportar el modelo de usuario
module.exports = mongoose.model('User', UserSchema);
