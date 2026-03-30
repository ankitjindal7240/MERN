import mongoose from 'mongoose' 
export const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("momgo db connected succesfully")
    
    } catch (error) {
        console.error("errorc connecting" ,error)
    }
}