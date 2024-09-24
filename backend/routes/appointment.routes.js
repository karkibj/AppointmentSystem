// routes/appointmentRoutes.js
import { bookAppointment } from '../controllers/appointmentController.js';
import {checkDoctorAvailability} from '../middlewares/validators/checkDoctorAvailability.js'

import express from 'express';
import { verifyUser } from '../middlewares/jwtAuth.js';
import { getAllAppointments } from '../controllers/appointmentController.js';
import { updateDoctorAvailability } from '../middlewares/validators/updateDoctorAvailability.js.js';
// import { createAppointment } from '../controllers/appointmentController.js';


const router = express.Router();
router.post('/:doctorId', verifyUser, checkDoctorAvailability, updateDoctorAvailability, bookAppointment);
router.get('/getAllappointments',verifyUser,getAllAppointments);

export default router