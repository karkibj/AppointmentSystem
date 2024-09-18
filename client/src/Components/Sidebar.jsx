import React from 'react';

const Sidebar = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-gray-800 text-white flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-5">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <a href="#dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#manageDoctors" className="block py-2 px-4 rounded hover:bg-gray-700">
              Manage Doctors
            </a>
          </li>
          <li>
            <a href="#managePatients" className="block py-2 px-4 rounded hover:bg-gray-700">
              Manage Patients
            </a>
          </li>
          <li>
            <a href="#settings" className="block py-2 px-4 rounded hover:bg-gray-700">
              Settings
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 p-8">
        <h1 className="text-3xl font-semibold">Welcome to the Admin Dashboard</h1>
        {/* Additional content for each section will go here */}
      </div>
    </div>
  );
};

export default Sidebar;
