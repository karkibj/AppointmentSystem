import { verifyUser } from "../middlewares/jwtAuth.js";
import express from "express"
const router=express.Router()
import { viewProfile,editProfile } from "../controllers/user.controller.js";

router.get('/view-profile',verifyUser,viewProfile)
router.put('/edit-profile',verifyUser,editProfile)

export default router