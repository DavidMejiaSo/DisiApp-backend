import express from "express";
import morgan  from    'morgan';
//-----------------------

import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import concertRoutes from './routes/concerts.routes.js';

//_---------------------



const app =express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

app.use('/api',authRoutes);
app.use('/api',usersRoutes);
app.use('/api',concertRoutes);

export default app;





