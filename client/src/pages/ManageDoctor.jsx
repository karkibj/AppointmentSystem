import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Navbar';
import DoctorTable from '../Components/DoctorTable';
import DoctorForm from '../Components/DoctorForm';
import AvailabilityForm from '../Components/AvailabilityForm';
import Modal from '../Components/Modal';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    specialization: '',
    profilePicture: null,
  });
  const [availability, setAvailability] = useState({
    day: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/doctor/');
        const data = await response.json();
        if (response.ok) {
          setDoctors(data.data);
        } else {
          console.error(data.message);
          alert('Error fetching doctors');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('Error fetching doctors');
      }
    };
    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewDoctor((prev) => ({
      ...prev,
      [name]: name === 'profilePicture' ? files[0] : value,
    }));
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    const formData = new FormData();
    Object.keys(newDoctor).forEach((key) => {
      formData.append(key, newDoctor[key]);
    });

    try {
      const response = await fetch('http://localhost:8080/api/doctor/createDoctor', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setDoctors((prev) => [...prev, data.data]);
        setShowAddForm(false);
        setNewDoctor({ name: '', email: '', phone: '', password: '', specialization: '', profilePicture: null });
      } else {
        alert(`Error adding doctor: ${data.message}`);
      }
    } catch (err) {
      alert('Error adding doctor');
    }
  };

  const handleDeleteDoctor = async (id) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://localhost:8080/api/doctor/deleteDoctor/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setDoctors((prev) => prev.filter((doctor) => doctor._id !== id));
      } else {
        alert('Error deleting doctor');
      }
    } catch (err) {
      alert('Error deleting doctor');
    }
  };

  const handleAvailabilityChange = (e) => {
    const { name, value } = e.target;
    setAvailability((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAvailability = async () => {
    const token = localStorage.getItem('accessToken');
    if (!selectedDoctor) return;

    try {
      const response = await fetch(`http://localhost:8080/api/doctor/add-availability/${selectedDoctor._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(availability),
      });
      if (response.ok) {
        setShowAvailabilityModal(false);
      } else {
        alert('Error adding availability');
      }
    } catch (err) {
      alert('Error adding availability');
    }
  };

  const onShowAvailabilityForm = (doctorId) => {
    const selected = doctors.find((doctor) => doctor._id === doctorId);
    setSelectedDoctor(selected);
    setShowAvailabilityModal(true);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Manage Doctors</h1>
        <button
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded shadow-lg transition duration-300"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Close Form' : 'Add New Doctor'}
        </button>

        {showAddForm && (
          <DoctorForm
            newDoctor={newDoctor}
            onChange={handleInputChange}
            onSubmit={handleAddDoctor}
          />
        )}

        <div className="mt-8 overflow-x-auto shadow-md rounded-lg bg-white">
          <DoctorTable
            doctors={doctors}
            onDelete={handleDeleteDoctor}
            onShowAvailabilityForm={onShowAvailabilityForm}
          />
        </div>

        <Modal isOpen={showAvailabilityModal} onClose={() => setShowAvailabilityModal(false)}>
          <AvailabilityForm
            availability={availability}
            onChange={handleAvailabilityChange}
            onSubmit={handleAddAvailability}
            existingSchedule={selectedDoctor ? selectedDoctor.availability : []}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ManageDoctors;
