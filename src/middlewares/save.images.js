import  multer from "multer"

const saveImage = multer.diskStorage({ //Guardar imagenes 


destination: (req,file,cb)=>{
    cb(null,'./public/uploads')
},
filename: (req,file,cb)=>{
    if(file !== null) {
        const ext=file.originalname.split('.').pop()
           cb (null,Date.now()+'.'+ext)}}
    
})

export const uploadImage =multer  ({storage:saveImage})