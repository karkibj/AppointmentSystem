import mongoose from "mongoose";

const AvailabilitySchema = new mongoose.Schema({
    day: {
        type: String, // or Enum if you want to limit days to specific values
        required: true
    },
    timeslot: {
        type:[String],
        
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type:String,
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
