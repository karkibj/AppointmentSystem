import React from 'react';

const AvailabilityForm = ({ availability, onChange, onSubmit, onDelete, existingSchedule = [] }) => {
  const isInvalid = !availability.day || !availability.startTime || !availability.endTime || availability.startTime >= availability.endTime;

  return (
    <form className="mt-6 bg-white p-6 shadow-lg rounded">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">Manage Availability</h2>

      {/* Dropdown for Day Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label htmlFor="day" className="text-sm font-medium text-gray-700 mb-1">Select Day</label>
          <select
            id="day"
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
        </div>

        <div className="flex flex-col">
          <label htmlFor="startTime" className="text-sm font-medium text-gray-700 mb-1">Start Time</label>
          <input
            id="startTime"
            type="time"
            name="startTime"
            value={availability.startTime}
            onChange={onChange}
            className="p-3 border rounded w-full focus:outline-none focus:ring focus:ring-indigo-300"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="endTime" className="text-sm font-medium text-gray-700 mb-1">End Time</label>
          <input
            id="endTime"
            type="time"
            name="endTime"
            value={availability.endTime}
            onChange={onChange}
            className="p-3 border rounded w-full focus:outline-none focus:ring focus:ring-indigo-300"
            required
          />
          {availability.startTime >= availability.endTime && availability.endTime && (
            <p className="text-red-500 text-xs mt-1">End time should be after start time.</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center">
        <button
          type="button"
          className={`bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300 ${isInvalid ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={onSubmit}
          disabled={isInvalid}
        >
          {availability.id ? 'Update Availability' : 'Add Availability'}
        </button>

        {availability.id && (
          <button
            type="button"
            className="ml-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300"
            onClick={onDelete}
          >
            Delete Availability
          </button>
        )}
      </div>

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
        <p className="text-gray-700 mt-4">No availability set for this doctor.</p>
      )}
    </form>
  );
};

export default AvailabilityForm;
