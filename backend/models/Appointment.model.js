import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    date: {
        type: Date
    },
    time: {
        type: String, 
        required: true
    },
    status: {
        type: String,
        enum: ["booked", "canceled", "completed"],
    }
});

export default mongoose.model('Appointment', AppointmentSchema);
