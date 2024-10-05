import { Doctor } from "../models/Doctor.model.js";
import { User } from "../models/User.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Controller to get all doctors
const getAllDoctors = async (req, res) => {
    try {
        const allDoctors = await Doctor.find({}).populate('userId');
        if (!allDoctors) {
            return res.json(new ApiResponse(404, null, "Data not found!!"));
        }
        return res.json(new ApiResponse(200, allDoctors, "Doctor data fetched successfully"));
    } catch (err) {
        throw new ApiError(500, "Internal server error", [err]);
    }
}

// Controller to create a new doctor and user account
const createDoctor = asyncHandler(async (req, res) => {
    console.log(req.user);
    console.log("backend hit");

    // Destructure relevant information from the request body
    const { name, email, phone, password, specialization } = req.body;
    const role = 'doctor'; // Setting user role as 'doctor'
    const profilePicture = req.file ? req.file.path : null; // Assuming you're using multer for file uploads

    // Validate input: All fields are required
    if (!name || !email || !phone || !password || !specialization) {
        return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json(new ApiError(400, "User with this email already exists", null));
    }

    // Upload the profile picture to Cloudinary, if available
    let uploadedImage = null;
    if (profilePicture) {
        uploadedImage = await uploadOnCloudinary(profilePicture);
        
        if (!uploadedImage) {
            return res.status(500).json(new ApiError(500, "Image upload failed"));
        } else {
            console.log("Uploaded Image URL:", uploadedImage.secure_url);
        }
    }

    // Create a new user in the database
    const newUser = new User({
        name,
        email,
        phone,
        password,  // Assuming the password is hashed using a pre-save hook
        role,
        profilePicture: uploadedImage ? uploadedImage.secure_url : null 
    });

    await newUser.save();
    console.log(newUser.role);

    // Create a new doctor profile, linking it to the newly created user
    const newDoctor = new Doctor({
        userId: newUser._id,  
        specialization
    });

    await newDoctor.save();

    return res.status(201).json(new ApiResponse(201, newDoctor, "Doctor created successfully"));
});

// Controller to delete a doctor and the associated user
const deleteDoctor = async (req, res) => {
    console.log("Backend hit");
    let doctorId = req.params.id.trim();

    // Fetch the doctor by doctorId
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        return res.status(404).json({
            status: "error",
            message: `Doctor with ID ${doctorId} not found`
        });
    }
    
    const userId = doctor.userId;  // Fetch associated userId

    try {
        // Delete the doctor and the associated user
        const removeDoctor = await Doctor.findByIdAndDelete(doctorId);
        const removeUser = await User.findByIdAndDelete(userId);

        if (removeDoctor && removeUser) {
            return res.status(200).json({
                status: "success",
                message: `Doctor with ID ${doctorId} removed successfully`
            });
        } else {
            return res.status(404).json({
                status: "error",
                message: `Doctor with ID ${doctorId} not found`
            });
        }
    } catch (error) {
        console.error("Error deleting doctor:", error);
        return res.status(500).json({
            status: "error",
            message: "An error occurred while deleting the doctor"
        });
    }
};

// Export the controller functions to be used in routes
export { getAllDoctors, createDoctor, deleteDoctor };