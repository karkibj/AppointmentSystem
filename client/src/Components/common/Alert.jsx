import React from 'react';

const Alert = ({ message, onClose, type = 'error' }) => {
  // Define color styles based on the type of alert (error, success, etc.)
  const alertColors = {
    error: 'bg-red-100 text-red-700 border-red-400',
    success: 'bg-green-100 text-green-700 border-green-400',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-400',
  };

  return (
    <div
      className={`border ${alertColors[type]} px-4 py-3 rounded relative max-w-lg mx-auto mb-4`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      <button
        onClick={onClose}
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
      >
        <svg
          className="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 5.238a1 1 0 10-1.414 1.414L8.828 10l-3.176 3.176a1 1 0 101.414 1.414L10 12.828l2.934 2.934a1 1 0 101.414-1.414L11.172 10l3.176-3.176z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Alert;
