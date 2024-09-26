// import {Appointment} from "../models/Appointment.model.js";
import AppointmentModel from "../models/Appointment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { model } from "mongoose";

    
  const bookAppointment = async (req, res) => {
    try {
      const { doctorId } = req.params;
      const { day, timeslot } = req.body;
      const userId = req.user._id; //
  
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
    // console.log("backend hit")
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
        // console.log(appointmentData)
    
   })   

    return res.status(200).json(new ApiResponse(200,appointmentData,"Appointments fetched sucessfully") )

    }
    catch(err){
        res.json(new ApiError(500,"Internal Server Error",[err.message]))
    }
}




export {bookAppointment,getAllAppointments}