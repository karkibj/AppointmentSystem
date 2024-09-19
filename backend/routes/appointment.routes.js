// routes/appointmentRoutes.js
import { bookAppointment } from '../controllers/appointmentController.js';
import express from 'express';
// import { createAppointment } from '../controllers/appointmentController.js';


const router = express.Router();

router.post('/:doctorId/:userId',bookAppointment)

export default router