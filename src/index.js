const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
//settings

app.set('port', process.env.PORT||3002);
app.set('json spaces',2);
//middelware
app.use(morgan('combine'));
app.use(express.urlencoded({ extended:false}));
app.use(express.json());

//routes
app.use(require('./routes/index'));
app.use('/api/miembros',require('./routes/miembros'));
// Importar las rutas
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');

// Usar las rutas
app.use('/api/login', loginRoutes);
app.use('/api/register', registerRoutes);

//MongoDBConnection
mongoose.connect(process.env.MONGO_DB_URI)
.then(()=> console.log('Conexión a  BASE DATOS Completa.....'))
.catch((error)=> console.error(error));

//Starting server

app.listen(app.get('port'),() => {
    console.log(`Server on port ${app.get('port')}`);

})