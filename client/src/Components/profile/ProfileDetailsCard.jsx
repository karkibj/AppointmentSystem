import React, { useState, useEffect } from 'react';

function ProfileDetailsCard({ name = '', email = '', phone = '', address = '' ,profilePicture='' ,onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);
  const [editPhone, setEditPhone] = useState(phone);
  const [editAddress, setEditAddress] = useState(address);
  const [profileImage, setProfileImage] = useState(profilePicture); // Placeholder image

  useEffect(() => {
    setEditName(name);
    setEditEmail(email);
    setEditPhone(phone);
    setEditAddress(address);
    setProfileImage(profilePicture)
  }, [name, email, phone, address,profilePicture]);

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(name);
    setEditEmail(email);
    setEditPhone(phone);
    setEditAddress(address);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(editName, editEmail, editPhone, editAddress, profileImage); // Save with profileImage
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the profile image as base64
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <img
            src={profilePicture} // Display selected or default image
            alt="Profile"
            className="rounded-full w-32 h-32 mb-6 object-cover border-4 border-indigo-500 shadow-lg"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange} // Handle image selection
              className="mt-2"
            />
          )}
          <h2 className="text-xl font-semibold mt-4 text-gray-700">{editName}</h2>
        </div>

        <div className="md:col-span-2 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
            {isEditing ? (
              <div>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-lg shadow-lg mr-4"
                  onClick={handleSave}
                >
                  Save Profile
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-lg shadow-lg"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-5 rounded-lg shadow-lg"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="mt-4 space-y-4 text-gray-600">
            {isEditing ? (
              <>
                <div>
                  <span className="font-medium text-gray-700">Name: </span>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="ml-2 border rounded px-3 py-1"
                  />
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email: </span>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="ml-2 border rounded px-3 py-1"
                  />
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phone: </span>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="ml-2 border rounded px-3 py-1"
                  />
                </div>
                <div>
                  <span className="font-medium text-gray-700">Address: </span>
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="ml-2 border rounded px-3 py-1"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <span className="font-medium text-gray-700">Email: </span> {editEmail}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phone: </span> {editPhone}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Address: </span> {editAddress}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetailsCard;
