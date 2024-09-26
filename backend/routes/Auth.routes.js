import express from "express";
import { verifyUser } from "../middlewares/jwtAuth.js";
import { CreateUser,loginUser } from "../controllers/authController.js";
import { logoutUser } from "../controllers/authController.js";

const router=express.Router();

router.post('/register',CreateUser);
router.post('/login',loginUser);
router.post('/logout',verifyUser,logoutUser)


export default router

