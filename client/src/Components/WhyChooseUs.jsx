import React from 'react';

const reasons = [
  { title: 'Easy Booking', description: 'A seamless process to book appointments anytime, anywhere.' },
  { title: 'Verified Doctors', description: 'All doctors are fully qualified and verified professionals.' },
  { title: 'Fast Service', description: 'Get quick appointments without the hassle of waiting in line.' },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-center text-4xl font-bold mb-8">Why Choose Us</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {reasons.map((reason, index) => (
          <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-semibold mb-2">{reason.title}</h3>
            <p className="text-gray-600">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
