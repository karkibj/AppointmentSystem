import { User } from "../models/User.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { sendOTP } from '../utils/sendEmail.js';

const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (err) {
        throw new ApiError(500, "Unauthorized access", err);
    }
};

const updateAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        user.accessToken = accessToken;
        await user.save({ validateBeforeSave: false });
    } catch (err) {
        throw new ApiError(401, err?.message || "Invalid refresh token");
    }
};

const CreateUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;

    const newUser = new User({
        name,
        email,
        password,
        phone
    });

    await newUser.save({ validateBeforeSave: false });

    return res.status(201).json(new ApiResponse(201, newUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userData = await User.findOne({ email }).select('+password');

    if (!userData) {
        throw new ApiError(400, "User not found");
    }

    if (!await userData.isPasswordCorrect(password)) {
        throw new ApiError(400, "Incorrect password");
    }

    const { accessToken, refreshToken } = await generateTokens(userData._id);

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    userData.refreshToken=refreshToken;
    const user=await User.findById(userData._id).select("-password -lastFivePasswords -refreshToken")
    await userData.save(userData);
  
    return res.status(200).json(new ApiResponse(200, { accessToken, refreshToken,user}, "Login successful"));
});

const logoutUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.status(401).json(new ApiResponse(401, {}, "User not authenticated"));
    }

    console.log("Logging out user with ID:", req.user._id);

    const logout = await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { refreshToken: 1 } },
        { new: true }
    );

    if (!logout) {
        throw new ApiError(500, "Something went wrong while logging out the user");
    }

    return res
        .status(200)
        .clearCookie("accessToken", { httpOnly: true, secure: true })
        .clearCookie("refreshToken", { httpOnly: true, secure: true })
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json(new ApiResponse(400, {}, "Email is required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;

    const updatedUser = await user.save();
    if (!updatedUser) {
        return res.status(500).json(new ApiResponse(500, {}, "Something went wrong, please try again"));
    }

    await sendOTP(email, otp);

    return res.status(200).json(new ApiResponse(200, {}, "OTP sent to your email"));
});

const verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.otp !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    const currentTime = new Date();
    const otpCreatedAt = user.updatedAt;
    const otpTTL = 30 * 1000; // 30 seconds
    if (currentTime - otpCreatedAt > otpTTL) {
        throw new ApiError(400, "OTP has expired");
    }

    return res.status(200).json(new ApiResponse(200, {}, "OTP verified successfully"));

   
});


const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        throw new ApiError(400, "Current password and new password are required");
    }
    
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (!await user.isPasswordCorrect(currentPassword)) {
        throw new ApiError(400, "Current password is incorrect");
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: true });

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

export { loginUser, CreateUser, logoutUser, verifyOTP, forgotPassword, changePassword };
