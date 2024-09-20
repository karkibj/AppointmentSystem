import React from 'react'

const RecentAppointment = ({appointments}) => {
    
     return (
        <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Appointments</h2>
        <div className="bg-white p-6 shadow rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200">Doctor</th>
                <th className="py-2 px-4 bg-gray-200">Patient</th>
                <th className="py-2 px-4 bg-gray-200">Shedule</th>

                <th className="py-2 px-4 bg-gray-200">Booked Date</th>
                <th className="py-2 px-4 bg-gray-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment)=>(
                <tr key={appointment._id}>
                    <td className="py-2 px-4 border-b">{appointment.doctor}</td>
                <td className="py-2 px-4 border-b">{appointment.patient}</td>
                <td className="py-2 px-4 border-b">{appointment.shedule.day}-{appointment.shedule.time}</td>
                <td className="py-2 px-4 border-b text-green-500">{appointment.bookedDate}</td>
                <td className="py-2 px-4 border-b">appointment.status</td>
                
                </tr>
              ))}
             
                
            
              {/* Add more appointment entries here */}

            </tbody>
          </table>
        </div>
      </div>
  )
}

export default RecentAppointment
