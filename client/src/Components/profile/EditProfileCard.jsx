// ../Components/profile/EditProfileCard.jsx
import React from 'react';

const EditProfileCard = ({ onEdit }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Profile</h2>
      <p>Update your personal information</p>
      <button
        onClick={onEdit}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default EditProfileCard;
