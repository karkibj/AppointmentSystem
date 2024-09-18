// import {Appointment} from "../models/Appointment.model.js";
import { Doctor } from "../models/Doctor.model.js";

// import { User } from "../models/User.models";
// import { ApiError } from "../utils/ApiError";
// import { ApiResponse } from "../utils/ApiResponse";
// import { asyncHandler } from "../utils/asyncHandler";


const createAppointment=async (req,res)=>{
    const allDoctors=await Doctor.find({}).populate('userId')
    
    
    const updateAppointementSchema=(obj)=>{
        
        const doctorId=obj.doctorId;
        const specialization=obj.specialization
        // const 
    }

    allDoctors.forEach(updateAppointementSchema)

    // doctor ? 
    // day
    // start_time 
    // end_time
    // date
    // specialization 
    // no of Appointment




}

export {createAppointment}