import React from 'react';
import { FaThumbsUp, FaUserCheck, FaClock } from 'react-icons/fa'; // Example icons

const reasons = [
  { 
    title: 'Easy Booking', 
    description: 'A seamless process to book appointments anytime, anywhere.',
    icon: <FaThumbsUp className="text-blue-500 text-4xl mb-4" />
  },
  { 
    title: 'Verified Doctors', 
    description: 'All doctors are fully qualified and verified professionals.',
    icon: <FaUserCheck className="text-blue-500 text-4xl mb-4" />
  },
  { 
    title: 'Fast Service', 
    description: 'Get quick appointments without the hassle of waiting in line.',
    icon: <FaClock className="text-blue-500 text-4xl mb-4" />
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-center text-4xl font-bold mb-12">Why Choose Us</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {reason.icon} {/* Adding icon */}
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">{reason.title}</h3>
            <p className="text-gray-600 text-lg leading-relaxed">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
