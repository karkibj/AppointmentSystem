import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle Dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg py-4 fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo/Title */}
        <div className="text-3xl font-extrabold tracking-wider">
          <NavLink to="/" className="hover:text-gray-200 transition duration-300">
            Doctor<span className="text-yellow-300">Appointment</span>
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-lg font-semibold">
          <NavLink
            to="/"
            exact
            className="hover:text-yellow-300 transition duration-300 transform hover:scale-110"
            activeClassName="text-gray-200"
          >
            Home
          </NavLink>
          <NavLink
            to="/find-doctors"
            className="hover:text-yellow-300 transition duration-300 transform hover:scale-110"
            activeClassName="text-gray-200"
          >
            Find Doctors
          </NavLink>
          <NavLink
            to="/appointments"
            className="hover:text-yellow-300 transition duration-300 transform hover:scale-110"
            activeClassName="text-gray-200"
          >
            My Appointments
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-yellow-300 transition duration-300 transform hover:scale-110"
            activeClassName="text-gray-200"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-yellow-300 transition duration-300 transform hover:scale-110"
            activeClassName="text-gray-200"
          >
            Contact Us
          </NavLink>
        </nav>

        {/* Call to Action Button */}
        <div className="hidden md:block">
          <NavLink
            to="/book-appointment"
            className="px-4 py-2 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition duration-300 transform hover:scale-105"
          >
            Book Appointment
          </NavLink>
        </div>

        {/* User Profile/Actions */}
        <div className="relative">
          <div
            className="flex items-center cursor-pointer space-x-2"
            onClick={toggleDropdown}
          >
            <FaUserCircle className="text-3xl" />
            <FaCaretDown className="text-xl" />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-gray-700 transition-opacity duration-300 ease-in-out">
              <NavLink
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 transition duration-300"
                onClick={() => setDropdownOpen(false)} // Close dropdown when clicked
              >
                View Profile
              </NavLink>
              <NavLink
                to="/logout"
                className="block px-4 py-2 hover:bg-gray-100 transition duration-300"
                onClick={() => setDropdownOpen(false)} // Close dropdown when clicked
              >
                Logout
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation - Collapsed */}
      <nav className="md:hidden flex justify-between items-center py-3 px-6 bg-blue-500">
        <div className="text-lg font-bold">Menu</div>
        <button className="px-4 py-2 bg-yellow-400 rounded-md">Book Appointment</button>
      </nav>
    </header>
  );
};

export default Header;
