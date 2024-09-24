import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Navbar'; // Adjust the path based on your project structure
import RecentAppointment from '../Components/RecentAppointment';
import axios from "axios";
import { FaUserMd, FaUserInjured, FaCalendarAlt, FaHeartbeat } from 'react-icons/fa';

const Dashboard = () => {
  // Mock state for dashboard stats (fetch from backend in production)
  const [stats, setStats] = useState({
    totalDoctors: 10,
    totalPatients: 100,
    appointmentsToday: 5,
    totalAppointments: 500,
  });

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage
        const response = await axios.get('http://localhost:8080/api/appointment/getAllappointments', {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        });
        console.log(response.data)
        setAppointments(response.data.data); // Set the appointments from response
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8">Dashboard</h1>

        {/* Dashboard Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Doctors */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
            <FaUserMd className="text-4xl text-blue-500" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Total Doctors</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</p>
            </div>
          </div>

          {/* Total Patients */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
            <FaUserInjured className="text-4xl text-green-500" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Total Patients</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
            </div>
          </div>

          {/* Appointments Today */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
            <FaCalendarAlt className="text-4xl text-orange-500" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Appointments Today</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.appointmentsToday}</p>
            </div>
          </div>

          {/* Total Appointments */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
            <FaHeartbeat className="text-4xl text-red-500" />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Total Appointments</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments}</p>
            </div>
          </div>
        </div>

        {/* Recent Appointments Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <RecentAppointment appointments={appointments} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
