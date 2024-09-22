import React from 'react';

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://img.pikbest.com/backgrounds/20190805/social-medical-insurance-appointment-check-banner-background_1900885.jpg!bw700')`, // Insert a real medical image URL here
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for darkening background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 opacity-70"></div>
      
      {/* Content */}
      <div className="relative text-center text-white px-6">
        {/* Title */}
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg leading-tight">
          Book Your Doctor's Appointment Online
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl mb-8 font-light drop-shadow-sm">
          Fast, easy, and convenient way to get medical consultations.
        </p>

        {/* Call to Action Button */}
        <a
          href="#doctors"
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-lg font-semibold hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-lg"
        >
          Find Doctors
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
