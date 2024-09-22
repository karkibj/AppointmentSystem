import React from 'react';
import { FaUserMd, FaCalendarAlt, FaClipboardCheck } from 'react-icons/fa';

const steps = [
  { icon: <FaUserMd />, title: 'Select a Doctor', description: 'Choose from our list of experienced doctors.' },
  { icon: <FaCalendarAlt />, title: 'Pick a Time Slot', description: 'Find a time that works for you and book an appointment.' },
  { icon: <FaClipboardCheck />, title: 'Consultation', description: 'Meet with your doctor for a consultation.' },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-center text-4xl font-bold mb-8">How It Works</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {steps.map((step, index) => (
          <div key={index} className="text-center p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="text-5xl text-blue-500 mb-4">{step.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
