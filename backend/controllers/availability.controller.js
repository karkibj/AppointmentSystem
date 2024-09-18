import { Doctor } from "../models/Doctor.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const timeSlotGenerator=(startTime,endTime,interval=30)=>{
    const start = new Date(`1970-01-01T${startTime}:00`);  // Convert start time to a Date object
    const end = new Date(`1970-01-01T${endTime}:00`);      // Convert end time to a Date object
    const slots = [];

    while (start < end) {
        const slotStart = start.toTimeString().substring(0, 5);  // Get time in HH:MM format
        start.setMinutes(start.getMinutes() + interval);         // Increment time by interval
        const slotEnd = start.toTimeString().substring(0, 5);    // Get time in HH:MM format
        if (start <= end) {
            slots.push(`${slotStart} - ${slotEnd}`);  // Store time slot
        }
    }

    return slots;

}
const addAvailability=async (req,res)=>{
    try{

    const {day,startTime,endTime}=req.body
    const {doctorId}=req.params

    if(!day || !startTime || !endTime){
        return res.json(new ApiError(400,"Fill all the fields"))
    }
    //get doctor
    const doctor=await Doctor.findById(doctorId);
    console.log(doctor)
    const slots=timeSlotGenerator(startTime,endTime);
    const availabilityStore={
        day:day,
        startTime:startTime,
        endTime:endTime,
        timeslot:slots
    }

    await doctor.availability.push(availabilityStore)
    await doctor.save()
     
     return res.json(new ApiResponse(201,"Doctors availability added successfully",doctor))
    
     

}

    

    catch(err){
        return res.json(new ApiError(500,"Internal server error 500",[err.message]))
    }
}

export {addAvailability}