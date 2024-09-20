import React from 'react';
import Sidebar from '../Components/Navbar'; // Adjust the path based on your project structure
import { useEffect,useState } from 'react';
import RecentAppointment from '../Components/RecentAppointment';
import axios from "axios"

const Dashboard = () => {
  // Mock data for the dashboard statistics (replace with real data from an API or backend)
  const stats = {
    totalDoctors: 12,
    totalPatients: 80,
    totalAppointments: 56,
    completedAppointments: 40,
    pendingAppointments: 16,
  };

  const [appointments,setAppointments]=useState([])


useEffect(()=>{
  const fetchAppointments=async()=>{
    try{
      const response=await axios.get("http://localhost:8080/api/appointment/getAllappointments")
      console.log(response)
      console.log(response)
      if(response.status==200){
        console.log("OK")
        setAppointments(response.data.data)
      }
      else{
        alert('Error in fetching appointments')
      }
    }
    catch(err){
      console.log(err.data,err.message)
      
    }
  };
  fetchAppointments();
},[]);
  
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Total Doctors</h2>
            <p className="text-4xl font-bold mt-2 text-blue-500">{stats.totalDoctors}</p>
          </div>

          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Total Patients</h2>
            <p className="text-4xl font-bold mt-2 text-green-500">{stats.totalPatients}</p>
          </div>

          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Total Appointments</h2>
            <p className="text-4xl font-bold mt-2 text-purple-500">{stats.totalAppointments}</p>
          </div>

          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Completed Appointments</h2>
            <p className="text-4xl font-bold mt-2 text-yellow-500">{stats.completedAppointments}</p>
          </div>

          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Pending Appointments</h2>
            <p className="text-4xl font-bold mt-2 text-red-500">{stats.pendingAppointments}</p>
          </div>
        </div>

       <RecentAppointment appointments={appointments}/>
      </div>
    </div>
  );
};

export default Dashboard;
