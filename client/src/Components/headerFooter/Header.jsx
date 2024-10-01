import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle, FaCaretDown, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate=useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token); 
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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        navigate('/')
        
      }
    } catch (err) {
      alert('Internal Server error');
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white shadow-md py-4 fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo/Title */}
        <div className="text-3xl font-extrabold tracking-wider text-blue-600">
          <NavLink to="/" className="hover:text-blue-800 transition duration-300">
            Madh<span className="text-yellow-500">Yem</span>
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
          {['/', '/find-doctors', '/Blogs', '/about', '/contact'].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              exact
              className="hover:text-blue-500 transition duration-300 px-2 py-1 rounded"
              activeClassName="text-blue-500"
            >
              {path === '/' ? 'Home' : path.slice(1).replace('-', ' ')}
            </NavLink>
          ))}
        </nav>

        {/* User Profile/Actions */}
        <div className="relative">
          {isLoggedIn ? (
            <>
              <div
                className="flex items-center cursor-pointer space-x-2"
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <FaUserCircle className="text-3xl text-blue-600" />
                <FaCaretDown className="text-xl text-gray-700" />
              </div>

              {/* Dropdown Menu for Logged In Users */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 text-gray-700 transition-opacity duration-300 ease-in-out">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    View Profile
                  </NavLink>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
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
              className="px-5 py-2 bg-blue-500 text-white font-medium rounded-full shadow-md hover:bg-blue-600 transition duration-300"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {mobileMenuOpen ? (
            <FaTimes className="text-2xl cursor-pointer" onClick={toggleMobileMenu} />
          ) : (
            <FaBars className="text-2xl cursor-pointer" onClick={toggleMobileMenu} />
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg py-4 space-y-4">
          {['/', '/find-doctors', '/appointments', '/about', '/contact'].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              exact
              className="block text-lg font-medium text-gray-800 hover:bg-gray-100 px-6 py-2"
              activeClassName="text-blue-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              {path === '/' ? 'Home' : path.slice(1).replace('-', ' ')}
            </NavLink>
          ))}
          <NavLink
            to="/book-appointment"
            className="block text-lg font-medium text-white bg-blue-500 rounded-full px-6 py-3 mx-6 shadow-md hover:bg-blue-600"
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
