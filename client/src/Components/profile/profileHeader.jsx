// ../Components/profile/ProfileHeader.jsx
import React from 'react';

const ProfileHeader = ({ user }) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 h-72 rounded-b-2xl shadow-lg flex items-center justify-center">
      <div className="absolute -top-20 flex flex-col items-center">
        <img
          src={user.profilePicture}
          alt="User"
          className="w-40 h-40 rounded-full border-4 border-white shadow-xl object-cover"
        />
        <h1 className="mt-4 text-3xl text-white font-extrabold">{user.name}</h1>
        <p className="text-lg text-gray-100">{user.email}</p>
        <p className="text-sm text-gray-200">{user.phone}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
