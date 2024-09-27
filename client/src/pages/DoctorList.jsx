import React, { useEffect, useState } from 'react';
import DoctorCard from '../Components/doctors/DoctorCard.jsx';
import Header from '../Components/headerFooter/Header.jsx';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [specializationFilter, setSpecializationFilter] = useState(''); // Filter for specialization

  useEffect(() => {
    // Fetch doctor data from API
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/doctor/'); // Replace with actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data.data)
        setDoctors(data.data); // Update state with fetched data
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false once fetch is complete
      }
    };

    fetchDoctors();
  }, []);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter selection for specialization
  const handleFilterChange = (e) => {
    setSpecializationFilter(e.target.value);
  };

  // Filter doctors based on search term and specialization
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearchTerm =
      doctor.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = specializationFilter
      ? doctor.specialization === specializationFilter
      : true;
    return matchesSearchTerm && matchesSpecialization;
  });

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">Find a Doctor</h1>

        {/* Search Bar and Filters */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by name or specialization"
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 w-full md:w-1/2 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={specializationFilter}
            onChange={handleFilterChange}
            className="px-4 py-2 w-full md:w-1/4 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Specializations</option>
            {/* Dynamically create filter options based on available specializations */}
            {[...new Set(doctors.map((doctor) => doctor.specialization))].map((specialization) => (
              <option key={specialization} value={specialization}>
                {specialization}
              </option>
            ))}
          </select>
        </div>

        {/* Show loading spinner */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          // Show error message if there's an error
          <p className="text-red-500 text-center">Error: {error}</p>
        ) : filteredDoctors.length === 0 ? (
          // Show message if no doctors are found
          <p className="text-gray-700 text-center">No doctors found.</p>
        ) : (
          // Render the list of doctors
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorList;
