import mongoose from "mongoose";
const connectDB= async()=>{
try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅✅")
}
catch(err){
    console.log("DB connection failed",err.message);
    process.exit(1); 
    
}

};
export default connectDB;