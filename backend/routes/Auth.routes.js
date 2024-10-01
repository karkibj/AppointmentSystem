import express from "express";
import { verifyUser } from "../middlewares/jwtAuth.js";
import {
  CreateUser,
  loginUser,
  logoutUser,
  forgotPassword,
  verifyOTP,
  changePassword
} from "../controllers/authController.js";

const router = express.Router();
router.post('/register', CreateUser);
router.post('/login', loginUser);
router.post('/logout', verifyUser, logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/change-password', verifyUser, changePassword);

export default router;
