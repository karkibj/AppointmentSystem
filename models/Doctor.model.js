import mongoose from "mongoose";

const DoctorSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    specializaton:{
        type:"String",
    },
    availability:[{
        startTime:{
            type:Date
        },
        endTime:{
            type:Date
        }
    }]
        
    

})