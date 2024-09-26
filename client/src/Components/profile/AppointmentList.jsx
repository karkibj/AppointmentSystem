import React, { useState } from 'react';
import AppointmentCard from './AppointmentsCard';

function AppointmentList({ appointments }) {
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.title.toLowerCase().includes(search.toLowerCase()) &&
      (!filterDate || appointment.date === filterDate)
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 mr-4"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      {filteredAppointments.length > 0 ? (
        filteredAppointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))
      ) : (
        <p className="text-gray-600">No appointments found.</p>
      )}
    </div>
  );
}

export default AppointmentList;
