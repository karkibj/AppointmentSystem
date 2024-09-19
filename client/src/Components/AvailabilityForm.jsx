import React from 'react';

const AvailabilityForm = ({ availability, onChange, onSubmit }) => {
  return (
    <form className="mt-6 bg-white p-6 shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Add Availability</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <input
          type="text"
          name="day"
          placeholder="Day (e.g., Monday)"
          value={availability.day}
          onChange={onChange}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="time"
          name="startTime"
          value={availability.startTime}
          onChange={onChange}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="time"
          name="endTime"
          value={availability.endTime}
          onChange={onChange}
          className="p-2 border rounded w-full"
          required
        />
      </div>
      <button
        type="button"
        className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        onClick={onSubmit}
      >
        Add Availability
      </button>
    </form>
  );
};

export default AvailabilityForm;
