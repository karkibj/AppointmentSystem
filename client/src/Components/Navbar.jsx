import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUserMd, FaUserInjured, FaCog, FaBars, FaWrench,FaUser } from 'react-icons/fa';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 flex flex-col p-6 shadow-lg ${collapsed ? 'w-20' : 'w-64'} transition-width duration-300`}>
      {/* Toggle Button */}
      <button 
        className="text-gray-400 hover:text-white mb-6 self-center" 
        onClick={toggleSidebar}
      >
        <FaBars className="text-2xl" />
      </button>

      {/* Title / Logo */}
      {!collapsed && (
        <h2 className="text-2xl font-semibold mb-8 text-center text-white tracking-wide">
          Admin Panel
        </h2>
      )}
      <li>
  <NavLink
    to="/profile"
    className="flex items-center space-x-3 py-2 px-4 rounded-lg text-base transition duration-300 hover:bg-gray-700 hover:text-white"
    activeClassName="bg-gray-700 text-white"
  >
    <FaUser className="text-lg" />
    <span>Profile</span>
  </NavLink>
</li>


      {/* Navigation Links */}
      <ul className="space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {/* Dashboard */}
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-3 py-2 px-4 rounded-lg text-base transition duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white border-l-4 border-teal-500'
                  : 'hover:bg-gray-700 hover:text-white hover:shadow-md'
              }`
            }
          >
            <FaTachometerAlt className="text-lg" />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>
        </li>

        {/* Manage Doctors */}
        <li>
          <NavLink
            to="/manage-doctors"
            className={({ isActive }) =>
              `flex items-center space-x-3 py-2 px-4 rounded-lg text-base transition duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white border-l-4 border-teal-500'
                  : 'hover:bg-gray-700 hover:text-white hover:shadow-md'
              }`
            }
          >
            <FaUserMd className="text-lg" />
            {!collapsed && <span>Manage Doctors</span>}
          </NavLink>
        </li>

        {/* Manage Patients */}
        <li>
          <NavLink
            to="/manage-patients"
            className={({ isActive }) =>
              `flex items-center space-x-3 py-2 px-4 rounded-lg text-base transition duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white border-l-4 border-teal-500'
                  : 'hover:bg-gray-700 hover:text-white hover:shadow-md'
              }`
            }
          >
            <FaUserInjured className="text-lg" />
            {!collapsed && <span>Manage Patients</span>}
          </NavLink>
        </li>

        {/* Settings */}
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center space-x-3 py-2 px-4 rounded-lg text-base transition duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white border-l-4 border-teal-500'
                  : 'hover:bg-gray-700 hover:text-white hover:shadow-md'
              }`
            }
          >
            <FaWrench className="text-lg" /> {/* Changed to wrench icon */}
            {!collapsed && <span>Settings</span>}
          </NavLink>
        </li>
      </ul>

      {/* Footer */}
      {!collapsed && (
        <div className="mt-auto">
          <p className="text-xs text-gray-500 text-center">
            &copy; 2024 Your Company
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

