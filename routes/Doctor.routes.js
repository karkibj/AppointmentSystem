import express from "express";

const router=express.Router()

router.get('/doctors',getAllDoctors);
router.get('/doctors',getDoctorById)
router.post('/doctors')