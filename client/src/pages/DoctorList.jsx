import React, { useEffect, useState, useMemo } from 'react';
import DoctorCard from '../Components/doctors/DoctorCard.jsx';
import Header from '../Components/headerFooter/Header.jsx';
import { BeatLoader } from 'react-spinners'; // You can use any spinner component you prefer
import debounce from 'lodash.debounce'; // Import debounce from lodash

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');

  useEffect(() => {
    // Fetch doctor data from API
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/doctor/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDoctors(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Handle search input with debouncing
  const handleSearchChange = debounce((e) => {
    setSearchTerm(e.target.value);
  }, 300);

  // Handle filter selection for specialization
  const handleFilterChange = (e) => {
    setSpecializationFilter(e.target.value);
  };

  // Memoize filtered doctors to optimize performance
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearchTerm =
        doctor.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialization = specializationFilter
        ? doctor.specialization === specializationFilter
        : true;
      return matchesSearchTerm && matchesSpecialization;
    });
  }, [doctors, searchTerm, specializationFilter]);

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
            onChange={handleSearchChange}
            className="px-4 py-2 w-full md:w-1/2 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={specializationFilter}
            onChange={handleFilterChange}
            className="px-4 py-2 w-full md:w-1/4 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Specializations</option>
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
            <BeatLoader size={16} color="#3b82f6" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">Error: {error}</p>
        ) : filteredDoctors.length === 0 ? (
          <p className="text-gray-700 text-center">No doctors found. Try adjusting your search or filters.</p>
        ) : (
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
