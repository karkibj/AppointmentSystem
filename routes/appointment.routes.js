// routes/appointmentRoutes.js
import express from 'express';
import { createAppointment, getAppointments, getAppointmentById, updateAppointment, deleteAppointment } from '../controllers/appointmentController.js';
import { rbac, roles } from '../middleware/rbacMiddleware.js';

const router = express.Router();

// Appointment management routes with role-based access control
router.post('/', rbac([roles.DOCTOR, roles.ADMIN]),createAppointment);
router.get('/', rbac([roles.DOCTOR, roles.ADMIN]), getAppointments);
router.get('/:id', rbac([roles.DOCTOR, roles.ADMIN, roles.PATIENT]), getAppointmentById);
router.put('/:id', rbac([roles.DOCTOR, roles.ADMIN]), updateAppointment);
router.delete('/:id', rbac([roles.DOCTOR, roles.ADMIN]), deleteAppointment);

export default router;
