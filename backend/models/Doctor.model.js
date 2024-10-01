import mongoose from "mongoose";

const TimeSlotSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'reserved'],
        default: 'available'
    },
    reservedAt: { 
        type: Date,
        default: null
    }
});


const AvailabilitySchema = new mongoose.Schema({
    day: {
        type: String,  
        required: true
    },
    timeslot: [TimeSlotSchema], 
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

const DoctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    availability: [AvailabilitySchema]  
});

export const Doctor = mongoose.model('Doctor', DoctorSchema);
