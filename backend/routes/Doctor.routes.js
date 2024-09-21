import express from 'express';
import { createDoctor, getAllDoctors, deleteDoctor } from "../controllers/doctorController.js";
import { addAvailability ,viewAvailability,updateAvailability} from '../controllers/availability.controller.js';
import { jwtVerification } from '../middlewares/roleVerify.js';
import multer from 'multer';


const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Files will temporarily be stored in 'uploads/'

// Routes
router.post('/createDoctor', jwtVerification('admin'), upload.single('profilePicture'), createDoctor);
router.get('/', getAllDoctors);
router.delete('/deleteDoctor/:id', jwtVerification('admin'), deleteDoctor);
router.post('/add-availability/:doctorId',jwtVerification('admin'),addAvailability)
router.get('/view-availability/:doctorId',viewAvailability)
router.get('/view-availability/:doctorId',viewAvailability)
router.patch('/update-availability/:doctorId',updateAvailability)


export default router;
