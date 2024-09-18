import React from 'react';
import Sidebar from '../Components/Navbar'; // Adjust the path based on your project structure

const Dashboard = () => {
  // Mock data for the dashboard statistics (replace with real data from an API or backend)
  const stats = {
    totalDoctors: 12,
    totalPatients: 80,
    totalAppointments: 56,
    completedAppointments: 40,
    pendingAppointments: 16,
  };

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

        {/* Recent Activities or Appointments */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Appointments</h2>
          <div className="bg-white p-6 shadow rounded-lg">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200">Doctor</th>
                  <th className="py-2 px-4 bg-gray-200">Patient</th>
                  <th className="py-2 px-4 bg-gray-200">Date</th>
                  <th className="py-2 px-4 bg-gray-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Mock data for recent appointments */}
                <tr>
                  <td className="py-2 px-4 border-b">Dr. Lionel Messi</td>
                  <td className="py-2 px-4 border-b">John Doe</td>
                  <td className="py-2 px-4 border-b">2024-09-12</td>
                  <td className="py-2 px-4 border-b text-green-500">Completed</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Dr. Cristiano Ronaldo</td>
                  <td className="py-2 px-4 border-b">Jane Smith</td>
                  <td className="py-2 px-4 border-b">2024-09-11</td>
                  <td className="py-2 px-4 border-b text-red-500">Pending</td>
                </tr>
                {/* Add more appointment entries here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
