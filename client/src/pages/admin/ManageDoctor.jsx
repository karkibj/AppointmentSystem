import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/headerFooter/Navbar';
import DoctorTable from '../../Components/doctors/DoctorTable';
import DoctorForm from '../../Components/doctors/DoctorForm';
import AvailabilityForm from '../../Components/doctors/AvailabilityForm';
import Modal from '../../Components/doctors/Modal';
import Loader from '../../Components/common/Loader';  // Add a Loader component
import Alert from '../../Components/common/Alert';    // Add an Alert component for better error display

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);  // Loader state
  const [error, setError] = useState(null);       // Error state
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
      setLoading(true);  // Start loader
      try {
        const response = await fetch('http://localhost:8080/api/doctor/');
        const data = await response.json();
        if (response.ok) {
          setDoctors(data.data);
        } else {
          setError(data.message || 'Error fetching doctors');
        }
      } catch (err) {
        setError('Error fetching doctors');
      } finally {
        setLoading(false);  // Stop loader
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
    setLoading(true);
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
        alert(data.message)
        setNewDoctor({ name: '', email: '', phone: '', password: '', specialization: '', profilePicture: null });
      } else {
        setError(data.message || 'Error adding doctor');
      }
    } catch (err) {
      setError('Error adding doctor');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoctor = async (id) => {
    setLoading(true);
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://localhost:8080/api/doctor/deleteDoctor/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setDoctors((prev) => prev.filter((doctor) => doctor._id !== id));
      } else {
        setError('Error deleting doctor');
      }
    } catch (err) {
      setError('Error deleting doctor');
    } finally {
      setLoading(false);
    }
  };

  const handleAvailabilityChange = (e) => {
    const { name, value } = e.target;
    setAvailability((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAvailability = async () => {
    setLoading(true);
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
        setError('Error adding availability');
      }
    } catch (err) {
      setError('Error adding availability');
    } finally {
      setLoading(false);
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

        {loading && <Loader />} {/* Loader while fetching or performing actions */}

        {error && <Alert message={error} onClose={() => setError(null)} />} {/* Error alert */}

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
