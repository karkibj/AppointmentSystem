import mongoose from "mongoose";
import { User } from "../models/User.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);  
        const accessToken = user.generateAccessToken();  
        const refreshToken = user.generateRefreshToken(); // 

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (err) {
        throw new ApiError(500, "Unauthorized access", err);
    }
};

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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Retrieve user with the password field included
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new ApiError(400, "User not found");
    }
  
    if (!await user.isPasswordCorrect(password)) {
        throw new ApiError(400, "Incorrect password");
    }


    // Generate tokens
    const { accessToken, refreshToken } = await generateTokens(user._id);

    // Set cookies
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    // Return success response
    return res.status(200).json(new ApiResponse(200, {accessToken,refreshToken,user}, "Login successful"));
});

export { loginUser, CreateUser };
