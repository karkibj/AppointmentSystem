import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Doctor } from "../models/Doctor.model.js";

const timeSlotGenerator = (startTime, endTime, interval = 30) => {
    const start = new Date(`1970-01-01T${startTime}:00`); 
    const end = new Date(`1970-01-01T${endTime}:00`);     
    const slots = [];

    while (start < end) {
        const slotStart = start.toTimeString().substring(0, 5); 
        start.setMinutes(start.getMinutes() + interval);        
        if (start <= end) {
            slots.push({
                time: slotStart,   
                status: 'available'
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
    
        const slots = timeSlotGenerator(startTime, endTime);

      
        const availabilityStore = {
            day: day,
            startTime: startTime,
            endTime: endTime,
            timeslot: slots  
        };

      
        doctor.availability.push(availabilityStore);

        await doctor.save();

        return res.json(new ApiResponse(201, "Doctor's availability added successfully", doctor));
    } catch (err) {
        console.log(err)
        return res.json(new ApiError(500, "Internal server error", [err.message]));
    }
};


const viewAvailability=async(req,res)=>{
    const {doctorId}=req.params
    const availability=await Doctor.findById(doctorId).select('availability');
    return res.json(new ApiResponse(200,availability,"Availability fetched successfully"))
    console.log(availability)
}


const updateAvailability=async(req,res)=>{
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
        const slots = timeSlotGenerator(startTime, endTime);


        const availabilityStore = {
            day: day,
            startTime: startTime,
            endTime: endTime,
            timeslot: slots   
        };

        doctor.availability=doctor.availability.filter(avail=>avail.day.toLocaleLowerCase()!==day.toLocaleLowerCase())
        doctor.availability.push(availabilityStore);

        await doctor.save();

        return res.json(new ApiResponse(201,doctor ,"Doctor's availability updated successfully"));
    } catch (err) {
        console.log(err)
        return res.json(new ApiError(500, "Internal server error", [err.message]));
    }
}

export { addAvailability,viewAvailability,updateAvailability};
 