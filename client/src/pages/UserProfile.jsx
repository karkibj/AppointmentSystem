import React, { useState, useEffect } from 'react';
import ProfileDetailsCard from '../Components/profile/ProfileDetailsCard';
import AppointmentList from '../Components/profile/AppointmentList.jsx';
import Header from '../Components/Header.jsx';
import { useNavigate } from 'react-router-dom';

const appointments = [
  { id: 1, title: 'Doctor Appointment', date: '2024-09-30', time: '10:00 AM', location: 'Springfield Hospital' },
  { id: 2, title: 'Business Meeting', date: '2024-10-01', time: '2:00 PM', location: 'Downtown Office' },
  { id: 3, title: 'Dentist Visit', date: '2024-10-02', time: '4:00 PM', location: 'Oral Health Clinic' },
];

// Initial empty profile
const userProfile = {
  name: '',
  email: '',
  phone: '',
  address: '',
  profilePicture: '',
};

function ProfilePage() {
  const [user, setUser] = useState(userProfile);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch the user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/view-profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        const data = await response.json();
        if (data.status === 401) {
          navigate('/login');
        } else {
          const fetchedData = data.data;
          setUser({
            ...userProfile,
            name: fetchedData.name,
            email: fetchedData.email,
            phone: fetchedData.phone,
            address: fetchedData.address || 'Add your address here',
            profilePicture: fetchedData.profilePicture || userProfile.profilePicture,
          });
        }
      } catch (err) {
        console.log(err.message);
        setError('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSaveProfile = async (name, email, phone, address, profileImage) => {
    try {
      const response = await fetch('http://localhost:8080/api/user/edit-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          // address,
          profilePicture: profileImage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({ name, email, phone, profilePicture: profileImage });
        alert(data.message || "Profile updated successfully!");
      } else {
        alert(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.log(err.message);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-10"></h1>

          {/* Profile Details Section */}
          <ProfileDetailsCard
            name={user.name}
            email={user.email}
            phone={user.phone}
            address={user.address}
            profilePicture={user.profilePicture}
            onSave={handleSaveProfile}
          />

          {/* Appointments Section */}
          <div className="mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">My Appointments</h2>
            <AppointmentList appointments={appointments} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
