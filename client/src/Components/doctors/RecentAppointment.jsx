import React from 'react';

const RecentAppointment = ({ appointments }) => {
  console.log(appointments);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Recent Appointments</h2>
      <div className="bg-white p-6 shadow rounded-lg">
        {appointments && appointments.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200">Doctor</th>
                <th className="py-2 px-4 bg-gray-200">Patient</th>
                <th className="py-2 px-4 bg-gray-200">Schedule</th>
                <th className="py-2 px-4 bg-gray-200">Booked Date</th>
                <th className="py-2 px-4 bg-gray-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td className="py-2 px-4 border-b">{appointment?.doctor || "N/A"}</td>
                  <td className="py-2 px-4 border-b">{appointment?.patient || "N/A"}</td>
                  <td className="py-2 px-4 border-b">
                    {appointment?.shedule?.day || "N/A"} - {appointment?.shedule?.time || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b text-green-500">
                    {new Date(appointment?.bookedDate).toLocaleDateString() || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">{appointment?.status || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No recent appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentAppointment;
