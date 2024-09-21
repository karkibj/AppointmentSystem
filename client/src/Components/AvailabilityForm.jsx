import React from 'react';

const AvailabilityForm = ({ availability, onChange, onSubmit, onDelete, existingSchedule = [] }) => {
  return (
    <form className="mt-6 bg-white p-6 shadow-lg rounded">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">Manage Availability</h2>

      {/* Dropdown for Day Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <select
          name="day"
          value={availability.day}
          onChange={onChange}
          className="p-3 border rounded w-full focus:outline-none focus:ring focus:ring-indigo-300"
          required
        >
          <option value="">Select Day</option>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>

        <input
          type="time"
          name="startTime"
          value={availability.startTime}
          onChange={onChange}
          className="p-3 border rounded w-full focus:outline-none focus:ring focus:ring-indigo-300"
          required
        />
        <input
          type="time"
          name="endTime"
          value={availability.endTime}
          onChange={onChange}
          className="p-3 border rounded w-full focus:outline-none focus:ring focus:ring-indigo-300"
          required
        />
      </div>

      <button
        type="button"
        className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300"
        onClick={onSubmit}
      >
        {availability.id ? 'Update Availability' : 'Add Availability'}
      </button>

      {availability.id && (
        <button
          type="button"
          className="mt-4 ml-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300"
          onClick={onDelete}
        >
          Delete Availability
        </button>
      )}

      {/* Display existing schedule */}
      {existingSchedule.length > 0 ? (
        <div className="mt-4">
          <h3 className="font-semibold">Existing Schedule</h3>
          <ul>
            {existingSchedule.map((slot, index) => (
              <li key={index} className="text-gray-700">
                {slot.day}: {slot.startTime} - {slot.endTime}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No availability set for this doctor.</p>
      )}
    </form>
  );
};

export default AvailabilityForm;
