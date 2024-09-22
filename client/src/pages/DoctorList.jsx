import React, { useEffect, useState } from 'react';
import DoctorCard from '../Components/DoctorCard.jsx'; // Import DoctorCard component
import Header from '../Components/Header.jsx';
const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state

  useEffect(() => {
    // Fetch doctor data from API
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/doctor/'); // Replace with actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDoctors(data.data); // Update state with fetched data
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false once fetch is complete
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
    <Header/>
    <br />
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Find a Doctor</h1>

      {/* Show loading spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        // Show error message if there's an error
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : doctors.length === 0 ? (
        // Show message if no doctors are found
        <p className="text-gray-700 text-center">No doctors found.</p>
      ) : (
        // Render the list of doctors
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default DoctorList;
