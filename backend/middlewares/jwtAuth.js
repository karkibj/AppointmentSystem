import jwt from 'jsonwebtoken';
import { User } from '../models/User.models.js'; // Correct import statement
import { ApiResponse } from '../utils/ApiResponse.js';

const verifyUser = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    // const token = 
    // console.log(token)
    const token =req.cookies.accessToken || req.headers.authorization?.split(' ')[1]; 
    // console.log(token)
    
    // console.log("Token:", token); // For debugging purposes

    // If no token, deny access
    if (!token) {
      return res.status(401).json(new ApiResponse(401, null, "Access denied"));
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded._id) {
      return res.status(401).json(new ApiResponse(401, null, "Invalid token"));
    }

    // Find the user
    const user = await User.findById(decoded._id);
  
    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    // Attach user to the request
    req.user = user;
    return next();
  } catch (error) {
    // console.error("Error in verifyUser middleware:", error); // Detailed error logging
    res.status(401).json(new ApiResponse(401, null, 'Session Expired'));
  }
};

export { verifyUser };
