import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    day: {
        type: String,  // You can use a string like "Monday", "Tuesday", or a number (0-6) representing the day of the week.
        required: true
    },
    time: {
        type: String, 
        required: true
    },
    status: {
        type: String,
        enum: ["booked", "completed"],
        default: "booked"
    }
});

export default mongoose.model('Appointment', AppointmentSchema);
