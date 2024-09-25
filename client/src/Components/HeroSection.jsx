import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const images = [
    'https://mobisoftinfotech.com/resources/wp-content/uploads/2018/07/Banner-1.png', // Image 1
    'https://c8.alamy.com/comp/RX133F/doctor-with-medical-background-RX133F.jpg', // Image 2
    'https://wallpapers.com/images/hd/medical-background-cjge7e89adg6ub8x.jpg', // Image 3
    'https://wallpapers.com/images/hd/doctor-background-lenymxef6pkzfcjq.jpg'  // Image 4
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeTransition, setFadeTransition] = useState(true);

  // Automatically change background image every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeTransition(false); // Start fading out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeTransition(true); // Fade in new image
      }, 500); // Timing for fade out (half a second)
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Cleanup the interval
  }, [images.length]);

  return (
    <div
      className={`relative bg-cover bg-center h-screen flex items-center justify-center transition-opacity duration-1000 ${fadeTransition ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Low-opacity overlay for darkening background */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6 max-w-4xl">
        {/* Title with shadow to stand out */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-xl">
          Book Your Doctor's Appointment Online
        </h1>

        {/* Subtitle with shadow */}
        <p className="text-lg sm:text-xl md:text-2xl mb-8 font-light drop-shadow-md">
          Fast, easy, and convenient way to get medical consultations.
        </p>

        {/* Call to Action Button */}
        <a
          href="/find-doctors"
          className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-base sm:text-lg font-semibold hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-lg"
        >
          Find Doctors
        </a>
      </div>

      {/* Add more padding for smaller screens */}
      <style jsx>{`
        @media (max-width: 640px) {
          .relative {
            padding: 20px 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
