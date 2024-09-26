// Import necessary models and utility functions
//To create doctor and user account
//The code defines API endpoints for managing doctor data. 
// It includes functions to get all doctors, get a doctor by ID,
//  create a new doctor (with associated user), and delete a doctor 
//  (and their user). It handles profile picture uploads via Cloudinary and 
//  uses the populate method to fetch detailed user information linked to each doctor.



import { Doctor } from "../models/Doctor.model.js";
import { User } from "../models/User.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // Utility function for image uploads

<<<<<<< HEAD
// Controller to get a list of all doctors with populated user information
const getAllDoctors = async (req, res) => {
    // Fetch all doctors from the database and populate user information (userId is a reference)
    const allDoctors = await Doctor.find({}).populate('userId');
=======

// console.log(mongoose.Types.ObjectId.isValid('66e2adf825b0b9bb71d1e65c'));

const getAllDoctors=async (req,res)=>{
    const allDoctors=await Doctor.find({}).populate('userId');
    if(!allDoctors){
        return res.json(new ApiResponse(404,null,"Data not found!!"))
    }
    return res.json(new ApiResponse(200,allDoctors,"Doctor data fetched successfully"))
    // console.log(typeof(allDoctors))
}

const getDoctorById=async (req,res)=>{
>>>>>>> ac26518b198d7811018ae5b47fef8208f233ced2
    
    // If no doctors found, respond with a 404 error
    if (!allDoctors) {
        return res.json(new ApiResponse(404, null, "Data not found!!"));
    }

    // If doctors are found, respond with a success message and the doctor data
    return res.json(new ApiResponse(200, allDoctors, "Doctor data fetched successfully"));

    // Debugging: Log the type of allDoctors
    console.log(typeof(allDoctors));
};

// Controller to get doctor details by doctorId
const getDoctorById = async (req, res) => {
    // Extract doctorId from the request body
    const { doctorId } = req.body;

    // If doctorId is not provided, return an error
    if (!doctorId) {
        return res.json(new ApiError(404, "Please insert id"));
    }

    // Find the doctor by doctorId in the database
    const doctor = await Doctor.findById(doctorId);

    // If no doctor is found, return an error response
    if (!doctor) {
        return res.json(new ApiError(404, "Invalid Id"));
    }

    // If doctor is found, return a success message and the doctor data
    return res.json(new ApiResponse(200, doctor, "Doctor found successfully"));
};

// Controller to create a new doctor and user account
const createDoctor = asyncHandler(async (req, res) => {
<<<<<<< HEAD
    // Log current user and request for debugging purposes
    console.log(req.user);
    console.log("backend hit");

    // Destructure relevant information from the request body
    const { name, email, phone, password, specialization } = req.body;
    
    // Log file info for debugging (assuming you're using multer for file uploads)
    console.log(req.file);

    const role = 'doctor'; // Setting user role as 'doctor'
    const profilePicture = req.file ? req.file.path : null; // Check if a profile picture was uploaded
=======
    // console.log(req.user)
    // console.log("backend hit")
    const { name, email, phone, password, specialization } = req.body;
    // console.log(req.file)
    const role = 'doctor';
    const profilePicture = req.file ? req.file.path : null; // Assuming you're using `multer` for file uploads

    // console.log(req.body);
>>>>>>> ac26518b198d7811018ae5b47fef8208f233ced2

    // Validate input: All fields are required
    if (!name || !email || !phone || !password || !specialization) {
        return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json(new ApiError(400, "User with this email already exists"));
    }

<<<<<<< HEAD
    // Upload the profile picture to Cloudinary, if available
=======
>>>>>>> ac26518b198d7811018ae5b47fef8208f233ced2
    let uploadedImage = null;
    if (profilePicture) {
        uploadedImage = await uploadOnCloudinary(profilePicture);
        
        // If image upload fails, return an error
        if (!uploadedImage) {
            return res.status(500).json(new ApiError(500, "Image upload failed"));
        } else {
            console.log("Uploaded Image URL:", uploadedImage.secure_url); // Log the uploaded image URL
        }
    }

    // Create a new user in the database
    const newUser = new User({
        name,
        email,
        phone,
        password,  // Assuming the password is hashed using a pre-save hook
        role,
        profilePicture: uploadedImage ? uploadedImage.secure_url : null // Save Cloudinary image URL if uploaded
    });

    // Save the user data to the database
    await newUser.save();
    console.log(newUser.role);

    // Create a new doctor profile, linking it to the newly created user
    const newDoctor = new Doctor({
        userId: newUser._id,  // Reference to the newly created user
        specialization
    });

    // Save the new doctor to the database
    await newDoctor.save();

    // Return a success response with the created doctor data
    return res.status(201).json(new ApiResponse(201, newDoctor, "Doctor created successfully"));
});
<<<<<<< HEAD
=======
const deleteDoctor = async (req, res) => {
    // console.log("Backend hit ")
    let doctorId = req.params.id;
    // console.log(doctorId)
    doctorId = doctorId.trim(); 
    const doctor= await Doctor.findById(doctorId)
    console.log(doctor)
    const userId=doctor.userId
>>>>>>> ac26518b198d7811018ae5b47fef8208f233ced2

// Controller to delete a doctor and the associated user
const deleteDoctor = async (req, res) => {
    console.log("Backend hit");
    
    // Get the doctorId from request parameters and trim any extra spaces
    let doctorId = req.params.id;
    doctorId = doctorId.trim();

    // Fetch the doctor by doctorId
    const doctor = await Doctor.findById(doctorId);
    console.log(doctor);

    // Fetch the associated userId from the doctor data
    const userId = await Doctor.findById(doctorId).userId;
    console.log(userId);

    try {
        // Attempt to delete the doctor and the associated user
        const removeDoctor = await Doctor.findByIdAndDelete(doctorId);
        const removeUser = await User.findByIdAndDelete(userId);

        // If both doctor and user are successfully deleted, return a success response
        if (removeDoctor && removeUser) {
            return res.status(200).json({
                status: "success",
                message: `Doctor with ID ${doctorId} removed successfully`
            });
        } else {
            // If no doctor is found, return a 404 response
            return res.status(404).json({
                status: "error",
                message: `Doctor with ID ${doctorId} not found`
            });
        }
    } catch (error) {
        // Log the error and return a 500 response for server errors
        console.error("Error deleting doctor:", error);
        return res.status(500).json({
            status: "error",
            message: "An error occurred while deleting the doctor"
        });
    }
};

// Export the controller functions to be used in routes
export { getAllDoctors, getDoctorById, createDoctor, deleteDoctor };
