import { Doctor } from "../models/Doctor.model";
import { User } from "../models/User.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";


//getAll doctors

getAllDoctors=async (req,res)=>{

    const allDoctors=await Doctor.find({});
    if(!allDoctors){
        return res.json(new ApiResponse(404,null,"Data not found!!"))
    }
    return res.json(new ApiResponse(200,allDoctors,"Doctor data fetched successfully"))

}

getDoctorById=async (req,res)=>{
    
    const {doctorId}=req.body;
    if(!doctorId){
        return res.json(new ApiError(404,"Please insert id"));
    }

    const doctor=await Doctor.findById(doctorId);
    if(!doctor){
        return res.json(new ApiError(404,"Invalid Id "));
    }
    
    return res.json(new ApiResponse(200,doctor,"Doctor found successfully");)
}


const createDoctor = asyncHandler(async (req, res) => {
    const { name, email, phone, specialization } = req.body;

    // Validate input
    if (!name || !email || !phone || !specialization) {
        return res.status(400).json(new ApiError(400, "All fields are required"));
    }
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
        return res.status(400).json(new ApiError(400, "Doctor with this email already exists"));
    }

    const newDoctor = new Doctor({
        name,
        email,
        phone,
        specialization,
    });


    await newDoctor.save();

    // Send success response
    return res.status(201).json(new ApiResponse(201, newDoctor, "Doctor created successfully"));
});

export {getAllDoctors};