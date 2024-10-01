import React from 'react';

const DoctorTable = ({ doctors, onDelete, onShowAvailabilityForm }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <tr>
            <th className="py-4 px-6 font-semibold text-left">Profile</th>
            <th className="py-4 px-6 font-semibold text-left">Name</th>
            <th className="py-4 px-6 font-semibold text-left">Email</th>
            <th className="py-4 px-6 font-semibold text-left">Phone</th>
            <th className="py-4 px-6 font-semibold text-left">Specialization</th>
            <th className="py-4 px-6 font-semibold text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id} className="hover:bg-gray-50 transition duration-300">
              <td className="py-3 px-6 text-center">
                <img
                  src={doctor?.userId?.profilePicture || 'https://via.placeholder.com/40'}
                  alt={doctor?.userId?.name}
                  className="rounded-full w-10 h-10 border-2 border-indigo-500 shadow-md"
                />
              </td>
              <td className="py-3 px-6 font-medium text-gray-800">{doctor?.userId?.name}</td>
              <td className="py-3 px-6 text-gray-600">{doctor?.userId?.email}</td>
              <td className="py-3 px-6 text-gray-600">{doctor?.userId?.phone}</td>
              <td className="py-3 px-6 text-gray-600">{doctor?.specialization}</td>
              <td className="py-3 px-6 space-x-3">
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 shadow"
                  onClick={() => onShowAvailabilityForm(doctor._id)}
                >
                  Manage Availability
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 shadow"
                  onClick={() => onDelete(doctor._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;
