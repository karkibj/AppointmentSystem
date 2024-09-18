import React from 'react';
 // External CSS file for styling
import '../DoctorCard.css'
const DoctorCard = ({ doctor, onDelete }) => {
  return (
    <div className="doctor-card">
        <h1>{doctor?.userId?.name}</h1>
      <img
        className="doctor-image"
    src={doctor?.userId?.profilePicture}
        alt={doctor?.userId?.name}
      />
      <div className="doctor-info">
        <h3>{doctor?.name}</h3>
        <p>Email:{doctor?.userId?.email}</p>
        
        <p>Phone: {doctor?.userId?.phone}</p>
        <p>Specialization: {doctor?.userId?.specialization}</p>
        <button className="delete-button" onClick={() => onDelete(doctor._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default DoctorCard;
