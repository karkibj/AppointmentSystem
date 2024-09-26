import React from 'react';

const MedicalHistoryCard = ({ history }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Medical History</h3>
      {history.length > 0 ? (
        <ul>
          {history.map((entry, index) => (
            <li key={index} className="mb-2">
              <strong>{entry.date}:</strong> {entry.details}
            </li>
          ))}
        </ul>
      ) : (
        <p>No medical history available.</p>
      )}
    </div>
  );
};

export default MedicalHistoryCard;
