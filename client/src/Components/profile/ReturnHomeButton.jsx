// ../Components/profile/ReturnToHomeButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const ReturnToHomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="fixed bottom-6 right-6 px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transform hover:scale-110 transition duration-300 flex items-center"
    >
      <FaHome className="mr-2" /> Return to Home
    </button>
  );
};

export default ReturnToHomeButton;
