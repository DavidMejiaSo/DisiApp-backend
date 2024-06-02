import user from '../models/user.js';


export const deleteUserById = async (req,res)=>{
    const userFound= await user.findByIdAndDelete(req.params.id) 
    console.log(userFound)
    
    if(!userFound) return res.status(400).json({message:'User not found'});
 
    return res.json({id:     userFound._id,
     username: userFound.name,
     email:userFound.email,
     rol: userFound.rol,
     disponibility: userFound.disponibilidad,
 })
    

}
 


export const getAllUsers= async (req, res)=>{

const allUsers = await user.find();

return res.json(allUsers);
}
//export const logout= (req, res) => {};

export const getUserById = async  (req, res) => {
   const userFound= await user.findById(req.params.id) 
   console.log(req.user)
   
   if(!userFound) return res.status(400).json({message:'User not found'});

   return res.json({id:     userFound._id,
    username: userFound.name,
    email:userFound.email,
    rol: userFound.rol,
    disponibility: userFound.disponibilidad,
})
   
   
   
};