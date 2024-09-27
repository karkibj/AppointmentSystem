import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const DoctorCard = ({ doctor }) => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');
  const navigate = useNavigate();

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setSelectedSlot('');
    setBookingMessage('');
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setBookingMessage('');
  };

  const handleBooking = async () => {
    if (!selectedSlot) {
      alert('Please select a time slot.');
      return;
    }

    setIsBooking(true);
    try {
      const response = await fetch(`http://localhost:8080/api/appointment/${doctor._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          day: selectedDay,
          timeslot: selectedSlot,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        navigate('/login');
      } else if (response.ok) {
        setBookingMessage('Appointment booked successfully!');
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
    <div className="max-w-sm bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative p-6 mb-8">
      {/* Doctor's Profile Section */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={doctor.userId.profilePicture}
          alt={`${doctor.userId.name}'s profile`}
          className="w-20 h-20 object-cover rounded-full shadow-md border-2 border-gray-300"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{doctor.userId.name}</h2>
          <p className="text-sm text-blue-500">{doctor.specialization}</p>
          <p className="text-sm text-gray-600">{doctor.userId.email}</p>
          <p className="text-sm text-gray-600">{doctor.userId.phone}</p>
        </div>
      </div>

      {/* Verified Badge */}
      <div className="absolute top-2 right-2 flex items-center space-x-1 text-green-600">
        <FaCheckCircle className="text-xl" />
        <span className="text-xs font-semibold">Verified</span>
      </div>

      {/* Day Selection */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Available Days:</h3>
        <div className="flex flex-wrap mt-2 gap-2">
          {doctor.availability.map((dayInfo) => (
            <button
              key={dayInfo.day}
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors duration-300 ${
                selectedDay === dayInfo.day
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
          <h3 className="text-lg font-semibold text-gray-700">Available Time Slots:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {doctor.availability
              .find((dayInfo) => dayInfo.day === selectedDay)
              ?.timeslot.map((slot) => (
                <button
                  key={slot._id}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    selectedSlot === slot.time
                      ? 'bg-green-500 text-white shadow-lg'
                      : slot.status === 'available'
                      ? 'bg-gray-200 text-gray-800 hover:bg-green-100'
                      : 'bg-red-300 text-gray-500 cursor-not-allowed'
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
        <div className="text-right mt-6">
          <button
            className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 ${
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
    </div>
  );
};

export default DoctorCard;
