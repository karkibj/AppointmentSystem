// routes/appointmentRoutes.js
import { bookAppointment } from '../controllers/appointmentController.js';
import express from 'express';
import { getAllAppointments } from '../controllers/appointmentController.js';
// import { createAppointment } from '../controllers/appointmentController.js';


const router = express.Router();

router.post('/:doctorId/:userId',bookAppointment)
router.get('/getAllappointments',getAllAppointments);

export default router