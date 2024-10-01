import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUserMd, FaUserInjured, FaCog, FaBars, FaWrench, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-200 flex flex-col p-4 shadow-xl ${
        collapsed ? 'w-20' : 'w-64'
      } transition-all duration-300 ease-in-out`}
    >
      {/* Toggle Button */}
      <button
        className="text-gray-300 hover:text-white mb-6 self-center"
        onClick={toggleSidebar}
      >
        <FaBars className="text-2xl" />
      </button>

      {/* Title / Logo */}
      {!collapsed && (
        <h2 className="text-xl font-semibold mb-10 text-center text-white">
          Admin Panel
        </h2>
      )}

      {/* Navigation Links */}
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center space-x-3 py-3 px-4 rounded-lg text-sm font-medium tracking-wide transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md'
              }`
            }
          >
            <FaUser className="text-lg" />
            {!collapsed && <span>Profile</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-3 py-3 px-4 rounded-lg text-sm font-medium tracking-wide transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md'
              }`
            }
          >
            <FaTachometerAlt className="text-lg" />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/manage-doctors"
            className={({ isActive }) =>
              `flex items-center space-x-3 py-3 px-4 rounded-lg text-sm font-medium tracking-wide transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md'
              }`
            }
          >
            <FaUserMd className="text-lg" />
            {!collapsed && <span>Manage Doctors</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/manage-patients"
            className={({ isActive }) =>
              `flex items-center space-x-3 py-3 px-4 rounded-lg text-sm font-medium tracking-wide transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md'
              }`
            }
          >
            <FaUserInjured className="text-lg" />
            {!collapsed && <span>Manage Patients</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center space-x-3 py-3 px-4 rounded-lg text-sm font-medium tracking-wide transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md'
              }`
            }
          >
            <FaWrench className="text-lg" />
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
