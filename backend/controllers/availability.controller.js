import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Doctor } from "../models/Doctor.model.js";

const timeSlotGenerator = (startTime, endTime, interval = 30) => {
    const start = new Date(`1970-01-01T${startTime}:00`);  // Convert start time to Date
    const end = new Date(`1970-01-01T${endTime}:00`);      // Convert end time to Date
    const slots = [];

    while (start < end) {
        const slotStart = start.toTimeString().substring(0, 5);  // Get time in HH:MM format
        start.setMinutes(start.getMinutes() + interval);         // Increment time by interval
        if (start <= end) {
            slots.push({
                time: slotStart,   // Store each start time as an individual slot
                status: 'available' // Default status is 'available'
            });
        }
    }

    return slots;
};

const addAvailability = async (req, res) => {
    try {
        const { day, startTime, endTime } = req.body;
        const { doctorId } = req.params;
        console.log(doctorId)
        console.log(req.body)
        if (!day || !startTime || !endTime) {
            return res.json(new ApiError(400, "Fill all the fields"));
        }

        // Get doctor
        const doctor = await Doctor.findById(doctorId);
        console.log(doctor)
        if (!doctor) {
            return res.json(new ApiError(404, "Doctor not found"));
        }

        // Generate time slots
        const slots = timeSlotGenerator(startTime, endTime);

        // Create availability entry
        const availabilityStore = {
            
            day: day,
            startTime: startTime,
            endTime: endTime,
            timeslot: slots   // Add generated time slots here
        };

        // Add availability to doctor's record
        doctor.availability.push(availabilityStore);

        await doctor.save();

        return res.json(new ApiResponse(201, "Doctor's availability added successfully", doctor));
    } catch (err) {
        console.log(err)
        return res.json(new ApiError(500, "Internal server error", [err.message]));
    }
};

export { addAvailability };
