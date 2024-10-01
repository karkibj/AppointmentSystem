import React from 'react';
import Header from '../Components/headerFooter/Header.jsx';  
import HeroSection from '../Components/home/HeroSection.jsx';
import HowItWorks from '../Components/home/HowItWorks.jsx';
import WhyChooseUs from '../Components/home/WhyChooseUs.jsx';
import HealthTipsBlog from '../Components/home/HealthTipsBlogs.jsx'; // Import the HealthTipsBlog component
import Footer from '../Components/headerFooter/Footer.jsx';

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

      {/* Health Tips Blog Section */}
      <HealthTipsBlog /> {/* Include the Health Tips Blog Section */}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
