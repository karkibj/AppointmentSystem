import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Navbar';
import DoctorTable from '../Components/DoctorTable';
import DoctorForm from '../Components/DoctorForm';
import AvailabilityForm from '../Components/AvailabilityForm';
import Modal from '../Components/Modal';  // Import the modal component

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false); // Modal visibility state
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
      } else {
        alert(`Error adding doctor: ${data.message}`);
      }
    } catch (err) {
      alert('Error adding doctor');
    }
  };

  const handleDeleteDoctor = async (id) => {
    console.log("handleDelete called")
    console.log(id)
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://localhost:8080/api/doctor/deleteDoctor/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        alert("docotor Deleted Successfully")
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

  const handleAddAvailability = async (doctorId) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://localhost:8080/api/doctor/add-availability/${doctorId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(availability),
      });
      if (response.ok) {
        setShowAvailabilityModal(false); // Close the modal after adding availability
      } else {
        alert('Error adding availability');
      }
    } catch (err) {
      alert('Error adding availability');
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-6">Manage Doctors</h1>
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Close Form' : 'Add Doctor'}
        </button>

        {showAddForm && (
          <DoctorForm
            newDoctor={newDoctor}
            onChange={handleInputChange}
            onSubmit={handleAddDoctor}
          />
        )}
        
        <br /> <br />

        <DoctorTable
          doctors={doctors}
          onDelete={handleDeleteDoctor}
          onShowAvailabilityForm={() => setShowAvailabilityModal(true)} // Show modal on click
        />
       
        {/* Availability Modal */}
        <Modal isOpen={showAvailabilityModal} onClose={() => setShowAvailabilityModal(false)}>
          <AvailabilityForm
            availability={availability}
            onChange={handleAvailabilityChange}
            onSubmit={() => handleAddAvailability('doctorId')} // Use real doctor ID
          />
        </Modal>
      </div>
    </div>
  );
};

export default ManageDoctors;
