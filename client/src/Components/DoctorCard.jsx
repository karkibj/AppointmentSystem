import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation

const DoctorCard = ({ doctor, userId }) => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');
  const navigate = useNavigate(); 
  // Handle day selection
  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setSelectedSlot('');
    setBookingMessage('');
  };

  // Handle time slot selection
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setBookingMessage('');
  };

  // Handle booking request
  const handleBooking = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }

    setIsBooking(true);
    try {
      const response = await fetch(`http://localhost:8080/api/appointment/${doctor._id}/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Include the JWT token
        },
        body: JSON.stringify({
          day: selectedDay,
          timeslot: selectedSlot,
        }),
      });

      const data = await response.json();
      
      if (response.status === 401) {
        // If unauthorized, navigate to login page
        navigate('/login');  // Redirects to login page
      } else if (response.ok) {
        setBookingMessage("Appointment booked successfully!");
      } else {
        setBookingMessage(`Error: ${data.message || 'Failed to book appointment'}`);
      }
    } catch (error) {
      setBookingMessage(`Error: ${error.message}`);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="max-w-sm bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden p-5 mb-6 relative">
      {/* Doctor's Profile Section */}
      <div className="flex items-center mb-6">
        <img
          src={doctor.userId.profilePicture} 
          alt={`${doctor.userId.name}'s profile`}
          className="w-24 h-24 object-cover rounded-full shadow-md transform hover:scale-105 transition-transform duration-300"
        />
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-800">{doctor.userId.name}</h2>
          <p className="text-sm text-indigo-600">{doctor.specialization}</p>
          <p className="text-sm text-gray-500">{doctor.userId.email}</p>
          <p className="text-sm text-gray-500">{doctor.userId.phone}</p>
        </div>
      </div>

      {/* Day Selection */}
      <div className="mb-4">
        <h3 className="text-md font-semibold text-gray-700">Available Days:</h3>
        <div className="flex flex-wrap mt-2 gap-2">
          {doctor.availability.map((dayInfo) => (
            <button
              key={dayInfo.day}
              className={`px-3 py-1 rounded-full font-semibold text-sm transition-colors duration-300 ${
                selectedDay === dayInfo.day
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              onClick={() => handleDaySelect(dayInfo.day)}
            >
              {dayInfo.day}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slot Selection */}
      {selectedDay && (
        <div className="mb-4">
          <h3 className="text-md font-semibold text-gray-700">Available Time Slots:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {doctor.availability
              .find((dayInfo) => dayInfo.day === selectedDay)
              ?.timeslot.map((slot) => (
                <button
                  key={slot._id}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    selectedSlot === slot.time
                      ? 'bg-green-500 text-white'
                      : slot.status === 'available'
                      ? 'bg-gray-200 text-gray-800 hover:bg-green-100'
                      : 'bg-red-300 text-gray-400 cursor-not-allowed'
                  }`}
                  onClick={() => slot.status === 'available' && handleSlotSelect(slot.time)}
                  disabled={slot.status !== 'available'}
                >
                  {slot.time}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Book Appointment Button */}
      {selectedSlot && (
        <div className="text-right mt-4">
          <button
            className={`px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 ${
              isBooking ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleBooking}
            disabled={isBooking}
          >
            {isBooking ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>
      )}

      {/* Booking Message */}
      {bookingMessage && (
        <p className={`mt-4 text-center ${bookingMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {bookingMessage}
        </p>
      )}

      {/* Animated Badge */}
      <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-bl-xl text-xs font-semibold">
        Verified
      </div>
    </div>
  );
};

export default DoctorCard;
