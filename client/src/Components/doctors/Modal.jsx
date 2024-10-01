import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300" onClick={onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-lg relative transform transition-all duration-300 scale-100">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
