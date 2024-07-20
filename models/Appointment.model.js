import mongoose, { mongo } from "mongoose";

const AppointmentSchema=new mongoose.Schema({
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"
    },
    date:{
        type:Date
    },
    status:{
        type:String,
        enum:["booked","canceled","completed"],
    }
})
