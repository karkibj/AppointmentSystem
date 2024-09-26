import express from 'express';
import { createDoctor, getAllDoctors, deleteDoctor } from "../controllers/doctorController.js";
import { addAvailability } from '../controllers/availability.controller.js';
import { jwtVerification } from '../middlewares/roleVerify.js';
import multer from 'multer';


const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Files will temporarily be stored in 'uploads/'

// Routes
router.post('/createDoctor', upload.single('profilePicture'), createDoctor);            // jwtVerification('admin'),
router.get('/getDoctor', getAllDoctors); // added getDoctor by Dipesh for clairification
router.delete('/deleteDoctor/:id', jwtVerification('admin'), deleteDoctor);
router.post('/add-availability/:doctorId',jwtVerification('admin'),addAvailability)

export default router;
