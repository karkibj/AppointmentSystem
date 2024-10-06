import AppointmentModel from "../models/Appointment.model.js";
import { Doctor } from "../models/Doctor.model.js";
import { User } from "../models/User.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const statsData = async (req, res) => {
    try {
        const totalDoctors = await Doctor.countDocuments();
        const totalAppointments = await AppointmentModel.countDocuments();
        const upcomingAppointments = await AppointmentModel.countDocuments({ status: "booked" });

        const totalPatients = await AppointmentModel.aggregate([
            {
                // Join AppointmentModel with UserModel on userId
                $lookup: {
                    from: 'users', //
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                // Unwind to access the user data inside the array
                $unwind: '$user'
            },
            {
                // Filter for users with the role 'user'
                $match: {
                    'user.role': 'user'
                }
            },
            {
                // Get distinct user IDs
                $group: {
                    _id: '$userId'
                }
            },
            {
               
                $count: 'totalPatients'
            }
        ]);

        const totalNumberOfPatients = totalPatients.length > 0 ? totalPatients[0].totalPatients : 0;

        // Prepare the stats array
        const stats = {
            totalDoctors,
            totalAppointments,
            upcomingAppointments,
            totalNumberOfPatients
        };

        // Return the response with stats data
        return res.status(200).json(new ApiResponse(200, stats, "Stats fetched successfully"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new ApiError(500, "Internal server error", [err.message]));
    }
};

export { statsData };
