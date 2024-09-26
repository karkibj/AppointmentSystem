import React from 'react';

const DoctorForm = ({ newDoctor, onChange, onSubmit }) => {
  return (
    <form className="mt-6 bg-white p-6 shadow-lg rounded" onSubmit={onSubmit}>
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">Add New Doctor</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newDoctor.name}
          onChange={onChange}
          className="p-3 border rounded w-full focus:outline-none focus:ring focus:ring-indigo-300"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newDoctor.email}
          onChange={onChange}
          className="p-3 border rounded w-full focus:outline-none focus:ring focus:ring-indigo-300"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newDoctor.phone}
          onChange={onChange}
          className="p-3 border rounded w-full focus:outline-none focus:ring focus:ring-indigo-300"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newDoctor.password}
          onChange={onChange}
          className="p-3 border rounded w-full focus:outline-none focus:ring focus:ring-indigo-300"
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={newDoctor.specialization}
          onChange={onChange}
          className="p-3 border rounded w-full focus:outline-none focus:ring focus:ring-indigo-300"
          required
        />
        <input
          type="file"
          name="profilePicture"
          onChange={onChange}
          className="p-3 border rounded w-full focus:outline-none focus:ring focus:ring-indigo-300"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default DoctorForm;
