import jwt from "jsonwebtoken";
import User from "../models/User.models";
import  {ApiResponse } from "../utils/ApiResponse.js"
const verifyUser=async (req,res,next)=>{
    try{
    const token=req.cookies.accessToken;
    if(!token){
        return res.json(new ApiResponse(401,null,"Acess denied ") );
    }
    const decoded=jwt. verify(token,process.env.JWT_SECRET);
    const user=await User.findById(decoded.userId);
    if(!user){
        return res.status(404).json({error:"Unauthorized"})
     }
    req.user=user;
     return next(); 
}
  catch (error) {
 res.status(401).json({ error: 'Invalid token' });
    
}
}