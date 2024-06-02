
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authRequired =(req,res,next) => {
// Obtener el encabezado de autorización
const authHeader = req.headers.authorization;
const token = authHeader.substring(7, authHeader.length);

if (!authHeader) return res.status(401).json({ message: 'No token,no authorized access' });


jwt.verify(token,process.env.TOKEN_SECRET_KEY,(err,user) => { 
    if(err) return res.status(403).json({ message: 'Invalid token'});

    req.user = user;
    console.log('Aquí estas en el AuthRequired');
    console.log(user['payload']);

    next();
  });



}