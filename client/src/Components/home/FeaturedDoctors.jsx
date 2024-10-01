import React from 'react';
import DoctorCard from '../doctors/DoctorCard';

const FeaturedDoctors = ({ doctors, loading, error }) => {
  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Loading Doctors...</h2>
          {/* You can add a spinner or skeleton loader here */}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-500">Error fetching doctors</h2>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Our Top Doctors</h2>
        <p className="text-gray-500 mb-6">Meet some of our highly rated professionals.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>

      {/* Optional: Call to action button */}
      <div className="text-center mt-8">
        <a 
          href="/doctors" 
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300"
        >
          View All Doctors
        </a>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
