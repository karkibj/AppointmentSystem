import mongoose from "mongoose";
import { User  } from "../models/User.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


const generateTokens=async (userId)=>{
    try{
    const user=await User.findbyId(userId);
    const acesstToken=user.generateAcessToken();
    const refreshToken = user.generateRefreshToken()

    user.refreshToken=refreshToken;
    await user.save({validateBeforesave:false});

    return {acesstToken,refreshToken};
    }
    catch(err){
        throw new ApiError(500,"Unauthorized acess",err)
    }
}


const CreateUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;

    // Create a new user
    const newUser = new User({
        name,
        email,
        password,
        phone
    });

    // Save the user to the database
    await newUser.save({ validateBeforeSave: false });
  
    // Return success response
    return res.status(201).json(new ApiResponse(201, newUser, "User created successfully"));
});


const loginUser=asyncHandler(async(req,res)=>{
    const  {email,password}=req.body;

    const user=User.findOne(email)
    if(!user){
      throw new ApiError(400,"User not Found");
    }

    if(!await user.isPasswordCorrect(password)){
        throw new ApiError(400,"Incorrect Password");

    }

    const {acesstToken,refreshToken}=await generateTokens(user._id);

    res.cookie("acessToken",acesstToken);
    res.cookie('RefreshToken',refreshToken);

    return res.json.status(200).json(new ApiResponse(200,user,"Login Successfull"));

});


export {loginUser,CreateUser};
