import mongoose from "mongoose";

// Definir el esquema del usuario
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
       
        trim:true
        
    },
    
    password: {
        type: String,
        required: true
    },
    photo_url:{
        type: String,
        default: ''

    },
    rol: {
        type: String,
        required: true
       
    },
    token: {
        type: String,
        required: true
       
    },
    redes_sociales: {
        type: Object,

        default: {
            Facebook: "",
            Instagram: "",
            TikTok: "",
            X: ""
        }
    },
    disponibilidad: {
        type: Array,
        default: []
    },
    
  
    date: {
        type: Date,
        default: Date.now
    }
});

// Crear y exportar el modelo de usuario
export default mongoose.model('User', UserSchema);
