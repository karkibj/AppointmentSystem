import { Doctor } from "../models/Doctor.model.js";
import { User } from "../models/User.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


// console.log(mongoose.Types.ObjectId.isValid('66e2adf825b0b9bb71d1e65c'));

const getAllDoctors=async (req,res)=>{
    const allDoctors=await Doctor.find({}).populate('userId');
    if(!allDoctors){
        return res.json(new ApiResponse(404,null,"Data not found!!"))
    }
    return res.json(new ApiResponse(200,allDoctors,"Doctor data fetched successfully"))
    console.log(typeof(allDoctors))
}

const getDoctorById=async (req,res)=>{
    
    const {doctorId}=req.body;
    if(!doctorId){
        return res.json(new ApiError(404,"Please insert id"));
    }

    const doctor=await Doctor.findById(doctorId);
    if(!doctor){
        return res.json(new ApiError(404,"Invalid Id "));
    }
    
    return res.json(new ApiResponse(200,doctor,"Doctor found successfully"));
}

const createDoctor = asyncHandler(async (req, res) => {
    console.log(req.user)
    console.log("backend hit")
    const { name, email, phone, password, specialization } = req.body;
    console.log(req.file)
    const role = 'doctor';
    const profilePicture = req.file ? req.file.path : null; // Assuming you're using `multer` for file uploads

    console.log(req.body);

    // Validate input
    if (!name || !email || !phone || !password || !specialization) {
        return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json(new ApiError(400, "User with this email already exists"));
    }

    // Upload profile picture to Cloudinary if available
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
        password,  // Assuming the password is hashed via the User model pre-save hook
        role,
        profilePicture: uploadedImage ? uploadedImage.secure_url : null // Save Cloudinary image URL
    });

    // Save the user to the database
    await newUser.save();
    console.log(newUser.role);

    // Create a new doctor with the user reference
    const newDoctor = new Doctor({
        userId: newUser._id,  // Link the doctor to the user
        specialization
    });

    // Save the doctor to the database
    await newDoctor.save();

    // Send success response
    return res.status(201).json(new ApiResponse(201, newDoctor, "Doctor created successfully"));
});
const deleteDoctor = async (req, res) => {
    console.log("Backend hit ")
    let doctorId = req.params.id;
    console.log(doctorId)
    doctorId = doctorId.trim(); 
    const doctor= await Doctor.findById(doctorId)
    console.log(doctor)
    const userId=await Doctor.findById(doctorId).userId;

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

  
export {getAllDoctors,getDoctorById,createDoctor,deleteDoctor}
