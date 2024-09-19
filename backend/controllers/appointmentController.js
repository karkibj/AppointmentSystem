// import {Appointment} from "../models/Appointment.model.js";
import { Doctor } from "../models/Doctor.model.js";
import AppointmentModel from "../models/Appointment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

    

// import { User } from "../models/User.models";
// import { ApiError } from "../utils/ApiError";
// import { ApiResponse } from "../utils/ApiResponse";
// import { asyncHandler } from "../utils/asyncHandler";



const updateDoctor = async (doctorId, day, timeslot) => {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
        throw new Error("Doctor not found");
    }

    // Find the availability entry for the specific day
    const availability = doctor.availability.find(entry => entry.day === day);
    if (!availability) {
        throw new Error(`No availability found for day: ${day}`);
    }

    // Find the specific timeslot and update its status
    const slotIndex = availability.timeslot.findIndex(slot => slot.time === timeslot);
    if (slotIndex === -1) {
        throw new Error(`Timeslot: ${timeslot} not found on day: ${day}`);
    }

    // Update the timeslot status
    availability.timeslot[slotIndex].status = 'reserved';

    // Save the updated doctor
    await doctor.save();
    console.log("Doctor's availability updated successfully");
};


const bookAppointment=async(req,res)=>{

    try{
    const {doctorId,userId}=req.params
    const {day,timeslot}=req.body
   await  updateDoctor(doctorId,day,timeslot);

    const appointment=new AppointmentModel({
        doctorId:doctorId,
        userId:userId,
        day:day,
        time:timeslot,
    })

    await appointment.save()

    return res.json(new ApiResponse(201,"Appointment booked successfully",appointment))
    }
    catch(err){
        res.json(new ApiError(500,"Internal server Error",[err.message]))
    }
}

export {bookAppointment}