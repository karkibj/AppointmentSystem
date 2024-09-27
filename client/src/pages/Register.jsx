import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';  // Importing a home icon
import myImage from '../pages/nurse.png'

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful! You can now log in.');
        navigate('/login', { replace: true });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log('Error occurred: ', err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
        {/* Left side with image */}
        <div className="hidden md:flex w-1/2 bg-blue-100 justify-center items-center p-6">
          <img src={myImage} alt="Illustration" className="w-3/4" />
        </div>

        {/* Right side with form */}
        <div className="w-full md:w-1/2 p-8">
          {/* Returning Home Button */}
          <div className="mb-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition"
            >
              <FaHome className="mr-2" /> Home
            </button>
          </div>

          <h2 className="text-3xl font-semibold text-gray-800 text-center">Sign Up</h2>
          <p className="text-gray-600 text-center mt-2">Create your account to get started!</p>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <input
              onChange={handleInputChange}
              value={formData.name}
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              onChange={handleInputChange}
              value={formData.email}
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              onChange={handleInputChange}
              value={formData.phone}
              name="phone"
              type="tel"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              onChange={handleInputChange}
              value={formData.password}
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              onChange={handleInputChange}
              value={formData.confirmPassword}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
