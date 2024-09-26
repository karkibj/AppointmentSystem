import React from 'react';

const DoctorTable = ({ doctors, onDelete, onShowAvailabilityForm }) => {
  return (
    <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="py-3 px-4">Profile</th>
          <th className="py-3 px-4">Name</th>
          <th className="py-3 px-4">Email</th>
          <th className="py-3 px-4">Phone</th>
          <th className="py-3 px-4">Specialization</th>
          <th className="py-3 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doctor) => (
          <tr key={doctor._id} className="hover:bg-gray-100 transition duration-300">
            <td className="py-3 px-4 text-center">
              <img
                src={doctor?.userId?.profilePicture || 'https://via.placeholder.com/40'}
                alt={doctor?.userId?.name}
                className="rounded-full w-10 h-10 border-2 border-indigo-600"
              />
            </td>
            <td className="py-3 px-4">{doctor?.userId?.name}</td>
            <td className="py-3 px-4">{doctor?.userId?.email}</td>
            <td className="py-3 px-4">{doctor?.userId?.phone}</td>
            <td className="py-3 px-4">{doctor?.specialization}</td>
            <td className="py-3 px-4 space-x-2">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded transition duration-300"
                onClick={() => onShowAvailabilityForm(doctor._id)}
              >
                Manage Availability
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded transition duration-300"
                onClick={() => onDelete(doctor._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DoctorTable;
