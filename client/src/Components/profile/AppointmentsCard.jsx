import React from 'react';

function AppointmentCard({ appointment }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h3 className="text-lg font-bold text-gray-700 mb-2">{appointment.doctor}</h3>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Day: </span> {appointment.day}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Time: </span> {appointment.time}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Status: </span> {appointment.status}
      </p>
    </div>
  );
}

export default AppointmentCard;
