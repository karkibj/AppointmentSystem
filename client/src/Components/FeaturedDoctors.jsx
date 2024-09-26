import React from 'react';
import DoctorCard from './DoctorCard';

const FeaturedDoctors = ({ doctors }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold">Our Top Doctors</h2>
        <p className="text-gray-500">Meet some of our highly rated professionals.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedDoctors;
