const checkDoctorAvailability = async (req, res, next) => {
    const { doctorId } = req.params;
    const { day, timeslot } = req.body;
  
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json(new ApiError(404, 'Doctor not found'));
    }
  
    const isAvailable = checkAvailability(doctor, day, timeslot); // Check if doctor is available
    if (!isAvailable) {
      return res.status(400).json(new ApiError(400, 'Doctor not available at the selected time'));
    }
  
    next(); // Proceed if available
  };

  export {checkDoctorAvailability}