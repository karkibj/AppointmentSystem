import { Doctor } from "../../models/Doctor.model.js";

const checkDoctorAvailability = async (req, res, next) => {
  const { doctorId } = req.params;
  const { day, timeslot } = req.body;

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }

  const isAvailable = doctor.availability.some(
    (slot) => slot.day === day 
  );
  if (!isAvailable) {
    return res.status(400).json({ message: 'Doctor not available at this time' });
  }

  next();
};

export { checkDoctorAvailability };
