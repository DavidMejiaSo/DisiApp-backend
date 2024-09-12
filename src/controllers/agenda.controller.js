import userAgenda from '../models/users_agenda.js';



export const addTimeEntry =  async (req, res) => { //NewAgenda user
    try {
        // Obtener el ownerId del payload del token
        const ownerId = req.user['payload'];
        console.log(ownerId);
        
        // Validar que los campos necesarios estén presentes
        console.log("entrando");
        const { startTime, endTime, description } = req.body;
        
        if (!startTime || !endTime) {
            return res.status(400).json({ message: 'startTime and endTime are required' });
        }
        
        // Buscar si el usuario ya tiene una lista de tiempos creada
        let timeList = await userAgenda.findOne({ownerId: ownerId});
        
        // Si no existe una lista, crear una nueva
        if (!timeList) {
            timeList = new userAgenda({
                ownerId,
                timeEntries: []
            });
        }

        // Agregar una nueva entrada a la lista de tiempos
        timeList.timeEntries.push({
            startTime:startTime,
            endTime: endTime,
            description: description || ''
        });

        // Guardar la lista de tiempos actualizada en la base de datos
        await timeList.save();

        res.status(201).json({ message: 'Time entry added successfully', timeList });
    } catch (error) {
        res.status(500).json({ message: 'Error adding time entry', error });
    }
};
export const deleteTimeEntry = async (req, res) => {
    try {
        const ownerId = req.user['payload']; // El ID del usuario viene del payload del token
        const timeEntryId = req.params.id; // ID de la entrada de tiempo a eliminar

        // Buscar la lista de tiempos del usuario
        let timeList = await userAgenda.findOne({ ownerId });

        if (!timeList) {
            return res.status(404).json({ message: 'No time entries found for this user' });
        }

        // Buscar y eliminar la entrada de tiempo específica
        const entryIndex = timeList.timeEntries.findIndex(entry => entry._id.toString() === timeEntryId);

        if (entryIndex === -1) {
            return res.status(404).json({ message: 'Time entry not found' });
        }

        // Eliminar la entrada de tiempo
        timeList.timeEntries.splice(entryIndex, 1);

        // Guardar la lista actualizada en la base de datos
        await timeList.save();

        res.status(200).json({ message: 'Time entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting time entry', error });
    }
};

export const getTimeEntries = async (req, res) => {
    try {
        const ownerId = req.user['payload']; // El ID del usuario viene del payload del token

        // Buscar la lista de tiempos del usuario
        let timeList = await userAgenda.findOne({ ownerId });

        if (!timeList) {
            return res.status(404).json({ message: 'No time entries found for this user' });
        }

        // Devolver todas las entradas de tiempo
        res.status(200).json(timeList.timeEntries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching time entries', error });
    }
};

export const getAllAgendas = async (req,res) => {
    const allAgendas = await userAgenda.find();

    return res.json(allAgendas);
};