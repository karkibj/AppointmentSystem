import React, { useState } from 'react';
import '../DoctorCreate.css'; // Ensure CSS is linked correctly
import Navbar from '../Components/Navbar';

const DoctorCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    specialization: ''
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.specialization) {
      setMessage('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/doctor/createDoctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Doctor registered successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          specialization: ''
        });
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.log(error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <>
      <Navbar />
      <div className='registration-container'>
        <div className='left-panel'>
          <h2>Start closing more deals with YourApp</h2>
          <p>Create a free account and get access to exclusive features.</p>
          <div className="image-mockup"></div>
        </div>

        <div className='right-panel'>
          <h2>Doctor Registration</h2>
          <form className='doctor-create-form' onSubmit={handleRegister}>
            <div className='form-group'>
              <label>Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter doctor's name"
                required
              />
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter doctor's email"
                required
              />
            </div>
            <div className='form-group'>
              <label>Phone</label>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                required
              />
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                placeholder='Create a password'
                required
              />
            </div>
            <div className='form-group'>
              <label>Specialization</label>
              <input
                type='text'
                name='specialization'
                value={formData.specialization}
                onChange={handleInputChange}
                placeholder='Enter specialization'
                required
              />
            </div>
            {message && <p className={`message ${message === 'Doctor registered successfully!' ? 'success' : ''}`}>{message}</p>}
            <button type='submit' className='btn-submit'>Add Doctor</button>
          </form>

          <div className='alternative-login'>
            <p>or continue with</p>
            <div className='auth-options'>
              <button className='auth-btn google-btn'>Google</button>
              <button className='auth-btn apple-btn'>Apple</button>
            </div>
            <p>Already have an account? <a href='/login'>Sign in</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorCreate;
