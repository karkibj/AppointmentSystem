import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/headerFooter/Navbar'; // Adjust the path based on your project structure
import RecentAppointment from '../../Components/doctors/RecentAppointment';
import axios from "axios";
import { FaUserMd, FaUserInjured, FaCalendarAlt, FaHeartbeat } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    appointmentsToday: 0,
    totalAppointments: 0
  });

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        
        // Fetch dashboard stats
        const statsRes = await axios.get('http://localhost:8080/api/doctor/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const { totalDoctors, totalAppointments, upcomingAppointments, totalNumberOfPatients } = statsRes.data.data;
        setStats({
          totalDoctors,
          totalPatients: totalNumberOfPatients,
          appointmentsToday: upcomingAppointments,
          totalAppointments
        });

        // Fetch recent appointments
        const appointmentRes = await axios.get('http://localhost:8080/api/appointment/getAllappointments', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAppointments(appointmentRes.data.data);
      } catch (error) {
        setError("Failed to load dashboard data. Please try again.");
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

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
