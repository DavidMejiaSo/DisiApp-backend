import mongoose from "mongoose";

// Definir el esquema del listado de tiempos
const UserAgendaSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Relación con el modelo de usuario
        required: true
    },
    timeEntries: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                default: () => new mongoose.Types.ObjectId(),  // Asigna automáticamente un ObjectId único
            },
            startTime: {
                type: String,
                required: true
            },
            endTime: {
                type: String,
                required: true
            },
            description: {
                type: String,
                default: ''
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

// Crear y exportar el modelo de UserAgenda
export default mongoose.model('UserAgenda', UserAgendaSchema);
