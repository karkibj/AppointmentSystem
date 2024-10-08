import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from "dotenv"
dotenv.config()


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) {
        return null;
    }

    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });

        console.log("Image uploaded successfully:", response.secure_url);

        // Clean up the local file after successful upload
        fs.unlink(localFilePath, (err) => {
            if (err) console.error("Error removing file:", err);
            else console.log("Temporary file deleted:", localFilePath);
        });

        return response;
    } catch (err) {
        console.error("Error during Cloudinary upload:", err);
        
        // Clean up the local file even if the upload failed
        fs.unlink(localFilePath, (err) => {
            if (err) console.error("Error removing file after failure:", err);
        });

        return null;
    }
};

export { uploadOnCloudinary };
