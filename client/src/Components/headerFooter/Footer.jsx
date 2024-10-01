import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-10 text-gray-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          {/* Company Information */}
          <div className="mb-4 md:mb-0">
            <h4 className="text-xl font-semibold">Doctor Appointment System</h4>
            <p className="mt-2">Connecting patients with trusted healthcare providers.</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h5 className="text-lg font-semibold">Quick Links</h5>
            <ul className="mt-2">
              <li><a href="/" className="hover:text-indigo-400">Home</a></li>
              <li><a href="/about" className="hover:text-indigo-400">About Us</a></li>
              <li><a href="/services" className="hover:text-indigo-400">Services</a></li>
              <li><a href="/contact" className="hover:text-indigo-400">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col">
            <h5 className="text-lg font-semibold">Follow Us</h5>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-indigo-400"><FaFacebookF /></a>
              <a href="#" className="hover:text-indigo-400"><FaTwitter /></a>
              <a href="#" className="hover:text-indigo-400"><FaInstagram /></a>
              <a href="#" className="hover:text-indigo-400"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Subscription Form */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h5 className="text-lg font-semibold">Subscribe to Our Newsletter</h5>
          <p className="mt-2">Stay updated with the latest health tips and news.</p>
          <div className="flex mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-2 rounded-l-lg focus:outline-none"
            />
            <button className="bg-indigo-600 text-white p-2 rounded-r-lg hover:bg-indigo-500">Subscribe</button>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-6">
          <p>&copy; 2024 Doctor Appointment System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
