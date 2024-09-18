import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

cloudinary.config({
    cloud_name: 'dbfahov4k',
    api_key: '168863253153398',
    api_secret:'Lmboo5QpmblVG94DVnm3UH3PFfc'
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
