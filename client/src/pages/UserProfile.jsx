import React, { useState, useEffect } from 'react';
import ProfileDetailsCard from '../Components/profile/ProfileDetailsCard';
import AppointmentList from '../Components/profile/AppointmentList';
import Header from '../Components/headerFooter/Header';
import { useNavigate } from 'react-router-dom';

// Initial empty profile
const userProfile = {
  name: '',
  email: '',
  phone: '',
  // address: '',
  profilePicture: '',
};

function ProfilePage() {
  const [user, setUser] = useState(userProfile);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch the user profile and appointments on component mount
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
        console.error(err.message);
        setError('Failed to fetch profile');
      } finally {
        setLoading(false); // End loading state
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/appointment/my-appointment', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setAppointments(data.data);
        } else {
          setError(data.message || "Failed to fetch appointments.");
        }
      } catch (err) {
        console.error(err.message);
        setError('Failed to fetch appointments');
      }
    };

    fetchProfile();
    fetchAppointments();
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
          // address, // Include address in the update
          profilePicture: profileImage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({ name, email, phone, profilePicture: profileImage });
        alert(data.message || "Profile updated successfully!");
      } else {
        setError(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error(err.message);
      setError("An error occurred while updating the profile.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-10"></h1>
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              {/* Profile Details Section */}
              <ProfileDetailsCard
                name={user.name}
                email={user.email}
                phone={user.phone}
                address="add your address here "
                profilePicture={user.profilePicture}
                onSave={handleSaveProfile}
              />

              {/* Appointments Section */}
              <div className="mt-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">My Appointments</h2>
                <AppointmentList appointments={appointments} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
