import { Doctor } from "../models/Doctor.model.js";
import { User } from "../models/User.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



const getAllDoctors=async (req,res)=>{
    try{
    const allDoctors=await Doctor.find({}).populate('userId');
    if(!allDoctors){
        return res.json(new ApiResponse(404,null,"Data not found!!"))
    }
    return res.json(new ApiResponse(200,allDoctors,"Doctor data fetched successfully"))
}
catch(err){
    throw new ApiError(500,"Internal server error",[err])
}

}

const createDoctor = asyncHandler(async (req, res) => {
    const { name, email, phone, password, specialization } = req.body;
    const role = 'doctor';
    const profilePicture = req.file ? req.file.path : null; 
    if (!name || !email || !phone || !password || !specialization) {
        return res.status(400).json(new ApiError(400, "All fields are required"));
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json(new ApiError(400, "User with this email already exists",null));
    }

    let uploadedImage = null;
if (profilePicture) {
    uploadedImage = await uploadOnCloudinary(profilePicture);
    if (!uploadedImage) {
        return res.status(500).json(new ApiError(500, "Image upload failed"));
    } else {
        console.log("Uploaded Image URL:", uploadedImage.secure_url);
    }
}


    // Create a new user
    const newUser = new User({
        name,
        email,
        phone,
        password, 
        role,
        profilePicture: uploadedImage ? uploadedImage.secure_url : null
    });

    await newUser.save();
    console.log(newUser.role);

    const newDoctor = new Doctor({
        userId: newUser._id,  // Link the doctor to the user
        specialization
    });

    await newDoctor.save();

    return res.status(201).json(new ApiResponse(201, newDoctor, "Doctor created successfully"));
});
const deleteDoctor = async (req, res) => {
    // console.log("Backend hit ")
    let doctorId = req.params.id;
    // console.log(doctorId)
    doctorId = doctorId.trim(); 
    const doctor= await Doctor.findById(doctorId)
    console.log(doctor)
    const userId=doctor.userId

    console.log(userId)
    try {
        const removeDoctor = await Doctor.findByIdAndDelete(doctorId);
        const removeUSer= await User.findByIdAndDelete(userId)
        
        
        if (removeDoctor && removeUSer) {
            // Send a success response with the ID of the removed doctor
            return res.status(200).json({
                status: "success",
                message: `Doctor with ID ${doctorId} removed successfully`
            });
        } else {
            // If no doctor was found, send a 404 response
            return res.status(404).json({
                status: "error",
                message: `Doctor with ID ${doctorId} not found`
            });
        }
    } catch (error) {
        console.error("Error deleting doctor:", error);
        // Send a 500 response for server errors
        return res.status(500).json({
            status: "error",
            message: "An error occurred while deleting the doctor"
        });
    }
};

  
export {getAllDoctors,createDoctor,deleteDoctor}
