import React, { useState } from 'react';
import AppointmentCard from './AppointmentsCard';

function AppointmentList({ appointments }) {
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.doctor.toLowerCase().includes(search.toLowerCase()) &&
      (!filterDate || appointment.day === filterDate)
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Appointments</h2>
      <div className="mb-6 flex flex-col md:flex-row justify-between">
        <input
          type="text"
          placeholder="Search by doctor name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 mb-2 md:mb-0 md:mr-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {filteredAppointments.length > 0 ? (
        filteredAppointments.map((appointment) => (
          <AppointmentCard key={appointment._id} appointment={appointment} />
        ))
      ) : (
        <p className="text-gray-600">No appointments found.</p>
      )}
    </div>
  );
}

export default AppointmentList;
