import { Doctor } from "../../models/Doctor.model.js";

const updateDoctorAvailability = async (req, res, next) => {
    const { doctorId } = req.params;
    const { day, timeslot } = req.body;

    try {
        // Find the doctor's availability for the given day and timeslot
        const doctor = await Doctor.findOne({
            _id: doctorId,
            'availability.day': day,
            'availability.timeslot.time': timeslot
        });

        // Check if doctor is available for the given timeslot
        if (!doctor) {
            return res.status(404).json({ message: "Doctor or timeslot not found" });
        }

        // Check if the timeslot is already reserved
        const timeslotAvailability = doctor.availability.find(avail => avail.day === day)
            .timeslot.find(slot => slot.time === timeslot);

        if (timeslotAvailability.status === "reserved") {
            return res.status(400).json({ message: "Timeslot is already reserved" });
        }

        // Update the timeslot status to "reserved" and set the reservedAt field to current time
        await Doctor.updateOne(
            { _id: doctorId, 'availability.day': day, 'availability.timeslot.time': timeslot },
            { 
                $set: { 
                    'availability.$[].timeslot.$[slot].status': 'reserved', 
                    'availability.$[].timeslot.$[slot].reservedAt': new Date() // Set the reservedAt field
                }
            },
            { arrayFilters: [{ 'slot.time': timeslot }] } // Filter to update the correct timeslot
        );

        next(); // Proceed to book the appointment
    } catch (error) {
        console.error("Error updating doctor availability:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { updateDoctorAvailability };
