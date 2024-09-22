import React from 'react';
import Header from '../Components/Header.jsx';  // Import the Header component
import HeroSection from '../Components/HeroSection.jsx';
import HowItWorks from '../Components/HowItWorks.jsx';
import WhyChooseUs from '../Components/WhyChooseUs.jsx';
import DoctorCard from '../Components/DoctorCard.jsx'; // Assuming you already have the DoctorCard component
import Footer from '../Components/Footer.jsx';

const doctorsData = [
  // Example doctor data to display on the homepage
];

const HomePage = () => {
  return (
    <div>
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Featured Doctors */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-center text-4xl font-bold mb-8 text-gray-900">Our Doctors</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {doctorsData.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
