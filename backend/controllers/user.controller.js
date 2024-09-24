import { User } from "../models/User.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const viewProfile=async(req,res)=>{
    const user=req.user;
    console.log(user);
    if(!user){
        return res.status(404).json(new ApiResponse(404,null,"user not found "))
    }

    return res.status(200).json(new ApiResponse(200,user,"Profile fetched successfully"));


}

const editprofile=async(req,res)=>{
   const  allowed_updates=['name','profilePicture']
    const updates=Object.keys(req.body)
    const isAllowedupdates=updates.every(up=>allowed_updates.includes(up))
    if(!isAllowedupdates){
        return res.status(400).josn(new ApiResponse(400,null,"Invalid fileds for update"))
    }

    updates.forEach((update)=>{
        req.user[update]=req.body[update]
    })

    await req.user.save()

    return res.status(200).json(new ApiResponse(200, req.user, "Profile updated successfully"));

}

export {viewProfile,editprofile}

