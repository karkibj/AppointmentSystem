import React from 'react';

const DoctorForm = ({ newDoctor, onChange, onSubmit }) => {
  return (
    <form className="mt-6 bg-white p-8 shadow-md rounded-lg" onSubmit={onSubmit}>
      <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Add New Doctor</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter doctor's name"
            value={newDoctor.name}
            onChange={onChange}
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter doctor's email"
            value={newDoctor.email}
            onChange={onChange}
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            required
          />
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter doctor's phone"
            value={newDoctor.phone}
            onChange={onChange}
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={newDoctor.password}
            onChange={onChange}
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            required
          />
        </div>

        {/* Specialization Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Specialization</label>
          <input
            type="text"
            name="specialization"
            placeholder="Enter specialization"
            value={newDoctor.specialization}
            onChange={onChange}
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            required
          />
        </div>

        {/* Profile Picture Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            onChange={onChange}
            className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-md focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-300"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default DoctorForm;
