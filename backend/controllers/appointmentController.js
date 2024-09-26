// import {Appointment} from "../models/Appointment.model.js";
  

// import { User } from "../models/User.models";
// import { ApiError } from "../utils/ApiError";
// import { ApiResponse } from "../utils/ApiResponse";
// import { asyncHandler } from "../utils/asyncHandler";


// Import necessary models and utility functions
import { Doctor } from "../models/Doctor.model.js";
import AppointmentModel from "../models/Appointment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

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
