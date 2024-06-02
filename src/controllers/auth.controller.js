import user from '../models/user.js';
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../libs/jwt.js';
import { token } from 'morgan';


 
export const register = async (req, res) => {
    const { email, password, name, rol } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10); // Encrypt password
      
        const newUser = new user({
            email,
            password: passwordHash,
            name,
            rol,
            photo_url: '/uploads/' + req.file.filename
        });

        
        // Crear el token con el ID del nuevo usuario
        const token = await createAccessToken(newUser._id);
        
        // Guardar el token en la base de datos
        newUser.token = token;
       // Guardar el nuevo usuario en la base de datos
        await newUser.save();

        res.json({
            id: newUser._id,
            username: newUser.name,
            email: newUser.email,
            rol: newUser.rol,
            photo_url: '/uploads/' + req.file.filename,
            disponibility: newUser.disponibilidad,
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}





export const login = async (req,res)=> {
    const{email,password} =req.body;
    try {

        const userFound= await user.findOne({email});



        if (!userFound) return res.status(400).json({message:'User not found'});

        
        const isMatch = await bcrypt.compare(password,userFound.password); //compara la contraseña 
  
        
        if (!isMatch) return res.status(400).json({message:'Incorrect password'}); //Compara si la contraseña es correcta
      
      

      
        // await newUser.save(); //Save in database
        //  const token= await createAccessToken(newUser._id); //Create access token
//
      
        
         
         
         
         
         
         
       res.json(
          {
            username: userFound.name,
            email:userFound.email,
            rol: userFound.rol,
            disponibility: userFound.disponibilidad,
            photo_url:userFound.photo_url
            ,token:userFound.token
        

          }
        );
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
};


//export const logout= (req, res) => {};

export const getUser = async  (req, res) => {
    
    
    const userFound= await user.findById(req.user['payload']);
   
   if(!userFound) return res.status(400).json({message:'User not found'});

   return res.json({id:userFound._id,
    username: userFound.name,
    email:userFound.email,
    rol: userFound.rol,
    disponibility: userFound.disponibilidad,
    photo_url:userFound.photo_url
    ,token:userFound.token
})
   
   
   
};

//HEY DAVID DE MAÑANA, tienes un problema a la hora de crear los tokens ya que creas uno con un menos es decir,
//Si kla BD crea un user con el id 12348910 en realdiad te crea uno con 12345678911, suma un digito al final y por eso es que no encuentra el user