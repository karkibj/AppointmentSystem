import mongoose from "mongoose";

const ConnectMongo=async (req,res)=>{
    try{
        await mongoose.connect(process.env.LOCAL_SERVER);
        console.log("Mongo Db connected successfully");
    }
    catch(err){
        console.log("Error occured while connecting Mongo Db",err);
    }

}

export default ConnectMongo