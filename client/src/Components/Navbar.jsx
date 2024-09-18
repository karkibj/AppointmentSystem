import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUserMd, FaUserInjured, FaCog } from 'react-icons/fa'; // Importing icons from react-icons

const Sidebar = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-white-600 text-white w-64 flex flex-col p-6 shadow-lg">
      {/* Title / Logo */}
      <h2 className="text-3xl font-bold mb-10 text-center tracking-wide">Admin Panel</h2>

      {/* Navigation Links */}
      <ul className="space-y-8">
        {/* Dashboard */}
        <li>
          <NavLink
            to="/admin/dashboard"
            className="flex items-center space-x-4 py-3 px-5 rounded-lg text-lg transition duration-200 hover:bg-white hover:bg-opacity-20 hover:text-white"
            activeClassName="bg-white bg-opacity-20"
          >
            <FaTachometerAlt className="text-xl" /> {/* Icon */}
            <span>Dashboard</span>
          </NavLink>
        </li>

        {/* Manage Doctors */}
        <li>
          <NavLink
            to="/manage-doctors"
            className="flex items-center space-x-4 py-3 px-5 rounded-lg text-lg transition duration-200 hover:bg-white hover:bg-opacity-20 hover:text-white"
            activeClassName="bg-white bg-opacity-20"
          >
            <FaUserMd className="text-xl" /> {/* Icon */}
            <span>Manage Doctors</span>
          </NavLink>
        </li>

        {/* Manage Patients */}
        <li>
          <NavLink
            to="/manage-patients"
            className="flex items-center space-x-4 py-3 px-5 rounded-lg text-lg transition duration-200 hover:bg-white hover:bg-opacity-20 hover:text-white"
            activeClassName="bg-white bg-opacity-20"
          >
            <FaUserInjured className="text-xl" /> {/* Icon */}
            <span>Manage Patients</span>
          </NavLink>
        </li>

        {/* Settings */}
        <li>
          <NavLink
            to="/settings"
            className="flex items-center space-x-4 py-3 px-5 rounded-lg text-lg transition duration-200 hover:bg-white hover:bg-opacity-20 hover:text-white"
            activeClassName="bg-white bg-opacity-20"
          >
            <FaCog className="text-xl" /> {/* Icon */}
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>

      {/* Footer (Optional) */}
      <div className="mt-auto">
        <p className="text-sm text-gray-300 text-center">
          &copy; 2024 Your Company
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
