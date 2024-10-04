import { User } from "../models/User.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";  // Assuming you're using Cloudinary for image uploads

// View user profile
const viewProfile = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    return res.status(200).json(new ApiResponse(200, user, "Profile fetched successfully"));
};

// Edit user profile
const editProfile = async (req, res) => {
    try {
        const allowed_updates = ['name', 'profilePicture', 'phone', 'email', 'address'];
        const updates = Object.keys(req.body);
        const isAllowedUpdates = updates.every((up) => allowed_updates.includes(up));

        if (!isAllowedUpdates) {
            return res.status(400).json(new ApiResponse(400, null, "Invalid fields for update"));
        }

        if (updates.includes('email')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(req.body.email)) {
                return res.status(400).json(new ApiResponse(400, null, "Invalid email format"));
            }

            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
                return res.status(400).json(new ApiResponse(400, null, "Email is already in use"));
            }
        }

        if (updates.includes('phone')) {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(req.body.phone)) {
                return res.status(400).json(new ApiResponse(400, null, "Invalid phone number format"));
            }
        }

        if (req.file) {
            const uploadedImage = await uploadOnCloudinary(req.file.path);
            if (!uploadedImage) {
                return res.status(500).json(new ApiResponse(500, null, "Image upload failed"));
            }
            req.body.profilePicture = uploadedImage.secure_url;
        }

        updates.forEach((update) => {
            req.user[update] = req.body[update];
        });

        await req.user.save();
        return res.status(200).json(new ApiResponse(200, req.user, "Profile updated successfully"));

    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json(new ApiResponse(500, null, "An error occurred while updating the profile"));
    }
};


export { viewProfile, editProfile };
