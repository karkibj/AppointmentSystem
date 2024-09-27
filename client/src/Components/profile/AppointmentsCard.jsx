import React from 'react';

function AppointmentCard({ appointment }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{appointment.doctor}</h3>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Day: </span> {appointment.day}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Time: </span> {appointment.time}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Status: </span> 
        <span className={`font-bold ${appointment.status === 'Confirmed' ? 'text-green-500' : 'text-red-500'}`}>
          {appointment.status}
        </span>
      </p>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition duration-200">
        View Details
      </button>
    </div>
  );
}

export default AppointmentCard;
