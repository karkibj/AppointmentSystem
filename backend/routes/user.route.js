import { verifyUser } from "../middlewares/jwtAuth.js";
import express from "express"
const router=express.Router()
import { viewProfile,editprofile } from "../controllers/user.controller.js";

router.get('/view-profile',verifyUser,viewProfile)
router.patch('/edit-profile',verifyUser,editprofile)

export default router