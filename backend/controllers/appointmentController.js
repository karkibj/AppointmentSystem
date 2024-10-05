// import {Appointment} from "../models/Appointment.model.js";
import AppointmentModel from "../models/Appointment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


    
 const bookAppointment = async (req, res) => {
    try {
      const { doctorId } = req.params;
      const { day, timeslot } = req.body;
      const userId = req.user._id; //
  
      if(!doctorId || !day || !timeslot || !userId){
        throw new ApiError(401,"All fields are required ")
      }
      const appointment = new AppointmentModel({
        doctorId,
        userId,
        day,
        time: timeslot,
      });
  
      await appointment.save();
      return res.status(201).json(new ApiResponse(201, 'Appointment booked successfully', appointment));
    } catch (err) {
      res.status(500).json(new ApiError(500, 'Internal server error', [err.message]));
    }
  };
  
const getAllAppointments=async(req,res)=>{
    try{
        
    const allAppointments=await AppointmentModel.find({})
    .populate('userId')
    .populate({
        path:'doctorId',
        populate:{
            path:'userId',
            model:'User'
        }
    })
   
    const appointmentData=[]
   allAppointments.map((appointment)=>{
        const data=new Object();
        data._id=appointment._id;
        data.doctor=appointment?.doctorId.userId.name;
        data.patient=appointment?.userId.name;
        data.bookedDate=appointment?.date
        data.shedule={
            day:appointment.day,
            time:appointment?.time
        }
        data.status=appointment?.status
        appointmentData.push(data);
    
   })   

    return res.status(200).json(new ApiResponse(200,appointmentData,"Appointments fetched sucessfully"))

    }
    catch(err){
        res.json(new ApiError(500,"Internal Server Error",[err.message]))
    }
}

const myAppointment = async (req, res) => {
  const userId = req.user._id;
  try {
      const appointments = await AppointmentModel.find({ userId })
      .populate({
        path:'doctorId',
        populate:{
            path:'userId',
            model:'User'
        }
    })      
      if (appointments.length === 0) {
          return res.status(404).json(new ApiResponse(404, {}, "No appointments yet"));
      }
      const appointmentData = appointments.map((appointment) => {
          return {
              _id: appointment._id,
              doctor: appointment.doctorId.userId.name,
              day: appointment.day,
              time: appointment.time,
              status: appointment.status,
          };
      });

      return res.status(200).json(new ApiResponse(200, appointmentData, "Your appointments fetched successfully"));
  } catch (err) {
      return res.status(500).json(new ApiError(500, "Internal Server Error", [err.message]));
  }
};

export {bookAppointment,getAllAppointments,myAppointment}