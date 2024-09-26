// import {Appointment} from "../models/Appointment.model.js";
<<<<<<< HEAD
  

// import { User } from "../models/User.models";
// import { ApiError } from "../utils/ApiError";
// import { ApiResponse } from "../utils/ApiResponse";
// import { asyncHandler } from "../utils/asyncHandler";


// Import necessary models and utility functions
=======
>>>>>>> ac26518b198d7811018ae5b47fef8208f233ced2
import { Doctor } from "../models/Doctor.model.js";
import AppointmentModel from "../models/Appointment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
<<<<<<< HEAD

// Function to update the doctor's availability for a specific timeslot on a given day
const updateDoctor = async (doctorId, day, timeslot) => {
    // Find the doctor by ID in the database
    const doctor = await Doctor.findById(doctorId);

    // If the doctor is not found, throw an error
    if (!doctor) {
        throw new Error("Doctor not found");
    }

    // Find the doctor's availability for the specified day
    const availability = doctor.availability.find(entry => entry.day === day);

    // If no availability is found for the day, throw an error
    if (!availability) {
        throw new Error(`No availability found for day: ${day}`);
    }

    // Find the specific timeslot for the given day
    const slotIndex = availability.timeslot.findIndex(slot => slot.time === timeslot);

    // If the timeslot is not found, throw an error
    if (slotIndex === -1) {
        throw new Error(`Timeslot: ${timeslot} not found on day: ${day}`);
    }

    // Mark the timeslot as reserved
    availability.timeslot[slotIndex].status = 'reserved';

    // Save the updated doctor record in the database
    await doctor.save();
    console.log("Doctor's availability updated successfully");
};

// Controller function to handle booking an appointment
const bookAppointment = async (req, res) => {
    try {
        // Extract doctorId and userId from request parameters
        const { doctorId, userId } = req.params;

        // Extract day and timeslot from the request body
        const { day, timeslot } = req.body;

        // Update the doctor's availability by marking the timeslot as reserved
        await updateDoctor(doctorId, day, timeslot);

        // Create a new appointment record with the provided details
        const appointment = new AppointmentModel({
            doctorId: doctorId,  // Reference to the doctor
            userId: userId,      // Reference to the user booking the appointment
            day: day,            // Day of the appointment
            time: timeslot       // Timeslot of the appointment
        });

        // Save the new appointment to the database
        await appointment.save();

        // Respond with a success message and the appointment details
        return res.json(new ApiResponse(201, "Appointment booked successfully", appointment));
    } catch (err) {
        // If an error occurs, respond with an error message
        res.json(new ApiError(500, "Internal server Error", [err.message]));
    }
};

// Export the bookAppointment function to be used in other parts of the application
export { bookAppointment };
=======
import { model } from "mongoose";

    
  const bookAppointment = async (req, res) => {
    try {
      const { doctorId } = req.params;
      const { day, timeslot } = req.body;
      const userId = req.user._id; // Get user ID from the authenticated user
  
      const appointment = new AppointmentModel({
        doctorId,
        userId,
        day,
        time: timeslot,
      });
  
      await appointment.save();
      return res.status(201).json(new ApiResponse(201, 'Appointment booked successfully', appointment));
    } catch (err) {
      res.status(500).json(new ApiError(500, 'Internal server error', [err.message]));
    }
  };
  
const getAllAppointments=async(req,res)=>{
    console.log("backend hit")
    try{
        
    const allAppointments=await AppointmentModel.find({})
    .populate('userId')
    .populate({
        path:'doctorId',
        populate:{
            path:'userId',
            model:'User'
        }

    })
    console.log(allAppointments)
    // console.log(allAppointments)
    const appointmentData=[]
   allAppointments.map((appointment)=>{
       const data=new Object();
       data._id=appointment._id;
        data.doctor=appointment?.doctorId.userId.name;
        data.patient=appointment?.userId.name;
        data.bookedDate=appointment?.date
        data.shedule={
            day:appointment.day,
            time:appointment?.time
        }
        data.status=appointment?.status
        appointmentData.push(data);
        console.log(appointmentData)
    
   })   

    return res.status(200).json(new ApiResponse(200,appointmentData,"Appointments fetched sucessfully") )

    }
    catch(err){
        res.json(new ApiError(500,"Internal Server Error",[err.message]))
    }
}




export {bookAppointment,getAllAppointments}
>>>>>>> ac26518b198d7811018ae5b47fef8208f233ced2
