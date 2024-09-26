import React from 'react';

function AppointmentCard({ appointment }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h3 className="text-lg font-bold text-gray-700 mb-2">{appointment.title}</h3>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Date: </span> {appointment.date}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-medium">Time: </span> {appointment.time}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Location: </span> {appointment.location}
      </p>
    </div>
  );
}

export default AppointmentCard;
