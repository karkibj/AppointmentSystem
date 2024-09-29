import { User } from "../models/User.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const viewProfile=async(req,res)=>{
    const user=req.user;
    // console.log(user);
    if(!user){
        return res.status(404).json(new ApiResponse(404,null,"user not found "))
    }

    return res.status(200).json(new ApiResponse(200,user,"Profile fetched successfully"));


}

const editProfile = async (req, res) => {
    // console.log("backend hti")
    try {
      const allowed_updates = ['name', 'profilePicture', 'phone', 'email'];
      const updates = Object.keys(req.body);
      const isAllowedUpdates = updates.every((up) => allowed_updates.includes(up));
  
      if (!isAllowedUpdates ) {
        return res.status(400).json(new ApiResponse(400, null, "Invalid fields for update"));
      }
  
      // Update the allowed fields
      updates.forEach((update) => {
        req.user[update] = req.body[update];
      });
  
      // Save the user profile
      await req.user.save();
  
      return res.status(200).json(new ApiResponse(200, req.user, "Profile updated successfully"));
    } catch (error) {
      // Handle any errors during the update
      return res.status(500).json(new ApiResponse(500, null, "An error occurred while updating the profile"));
    }
  };
  
  export { viewProfile, editProfile };
  

