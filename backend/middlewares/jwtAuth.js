import jwt from 'jsonwebtoken';
import { User } from '../models/User.models.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const verifyUser = async (req, res, next) => {
  try {
    // Retrieve token from cookies or Authorization header
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1]; 
    
    // If no token is provided, deny access
    if (!token) {
      return res.status(401).json(new ApiResponse(401, null, "Access denied. No token provided"));
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json(new ApiResponse(401, null, "Session expired. Please log in again."));
      }
      return res.status(401).json(new ApiResponse(401, null, "Invalid token"));
    }

    // If decoded token does not contain _id, deny access
    if (!decoded || !decoded._id) {
      return res.status(401).json(new ApiResponse(401, null, "Invalid token payload"));
    }

    // Find the user by ID
    const user = await User.findById(decoded._id);
  
    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    // Attach user to the request object
    req.user = user;
    
    // Proceed to the next middleware
    return next();
  } catch (error) {
    console.error("Error in verifyUser middleware:", error);
    res.status(500).json(new ApiResponse(500, null, 'Internal server error during authentication'));
  }
};

export { verifyUser };
