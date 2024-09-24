const updateDoctorAvailability = async (req, res, next) => {
    const { doctorId } = req.params;
    const { day, timeslot } = req.body;
  
    // Update the doctor's schedule to block the timeslot
    await DoctorModel.updateOne(
      { _id: doctorId, 'availability.day': day },
      { $push: { 'availability.$.timeslots': timeslot } }
    );
  
    next(); // Proceed to book the appointment
  };

  export {updateDoctorAvailability}