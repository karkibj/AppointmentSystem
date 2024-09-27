import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle, FaCaretDown, FaBars } from 'react-icons/fa';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in by checking for the accessToken
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        // Remove tokens only if logout was successful
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false); // Update login state
      }
    } catch (err) {
      alert('Internal Server error');
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-teal-700 via-cyan-600 to-blue-500 text-white shadow-lg py-4 fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo/Title */}
        <div className="text-3xl font-extrabold tracking-wider">
          <NavLink to="/" className="hover:text-gray-300 transition duration-300">
            Doctor<span className="text-yellow-400">Appointment</span>
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-lg font-semibold">
          {['/', '/find-doctors', '/appointments', '/about', '/contact'].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              exact
              className="hover:text-yellow-400 transition duration-300 transform hover:scale-110"
              activeClassName="text-yellow-400"
            >
              {path === '/' ? 'Home' : path.slice(1).replace('-', ' ')}
            </NavLink>
          ))}
        </nav>

        {/* Call to Action Button */}
        <div className="hidden md:block">
          <NavLink
            to="/book-appointment"
            className="px-5 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-md hover:bg-yellow-500 transition duration-300 transform hover:scale-105"
          >
            Book Appointment
          </NavLink>
        </div>

        {/* User Profile/Actions */}
        <div className="relative">
          {isLoggedIn ? (
            <>
              <div
                className="flex items-center cursor-pointer space-x-2"
                onClick={toggleDropdown}
              >
                <FaUserCircle className="text-3xl" />
                <FaCaretDown className="text-xl" />
              </div>

              {/* Dropdown Menu for Logged In Users */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-700 transition-opacity duration-300 ease-in-out">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition duration-300"
                    onClick={() => setDropdownOpen(false)} // Close dropdown when clicked
                  >
                    View Profile
                  </NavLink>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 transition duration-300"
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout(); // Properly calling handleLogout
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            // Show Login Button for Guests
            <NavLink
              to="/login"
              className="px-5 py-2 bg-blue-400 text-white-900 font-semibold rounded-full shadow-md hover:bg-yellow-500 transition duration-300 transform hover:scale-105"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <FaBars
            className="text-2xl cursor-pointer"
            onClick={toggleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-teal-600 px-6 py-4 space-y-2">
          {['/', '/find-doctors', '/appointments', '/about', '/contact'].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              exact
              className="block text-lg font-semibold text-white hover:bg-teal-700 rounded px-3 py-2 transition duration-300"
              activeClassName="bg-yellow-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              {path === '/' ? 'Home' : path.slice(1).replace('-', ' ')}
            </NavLink>
          ))}
          <NavLink
            to="/book-appointment"
            className="block text-lg font-semibold text-gray-900 bg-yellow-400 rounded-full px-5 py-2 hover:bg-yellow-500 transition transform hover:scale-105"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book Appointment
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;
