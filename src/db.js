import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


 const connectDB = async () => {
    
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("--BASE DE DATOS CONECTADA---");
    } catch (e) {
        console.log(e);
    }
   

    

};

export { connectDB };