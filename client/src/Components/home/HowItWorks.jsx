import React from 'react';
import { FaUserMd, FaCalendarAlt, FaClipboardCheck } from 'react-icons/fa';

const steps = [
  { icon: <FaUserMd aria-label="Doctor Icon" />, title: 'Select a Doctor', description: 'Choose from our list of experienced doctors.' },
  { icon: <FaCalendarAlt aria-label="Calendar Icon" />, title: 'Pick a Time Slot', description: 'Find a time that works for you and book an appointment.' },
  { icon: <FaClipboardCheck aria-label="Clipboard Check Icon" />, title: 'Consultation', description: 'Meet with your doctor for a consultation.' },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-center text-4xl font-bold mb-12 tracking-tight text-gray-900">How It Works</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="text-center p-8 bg-gray-100 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300"
          >
            <div className="text-6xl text-blue-500 mb-6">
              {step.icon}
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">{step.title}</h3>
            <p className="text-gray-600 text-lg leading-relaxed max-w-xs mx-auto">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
