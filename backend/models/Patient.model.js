import mongoose from "mongoose";
const PatientSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    medicalhistory:{
        type:String
    }
})