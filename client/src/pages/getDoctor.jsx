import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorCard from '../Components/DoctorCard.jsx'; // Import the card component
import '../GetDoctor.css'; // External CSS for styling
import Navbar from '../Components/Navbar.jsx';
  
const GetDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState('');


useEffect(()=>{
  const fetchDoctors=async ()=>{
    try{
      const response= await fetch("http://localhost:8080/api/doctor");
      const data=await response.json();
      console.log(data)
      console.log(typeof(data))
      console.log(data.message)
      console.log(data.data)
      console.log(data.sucess)
      if(response.ok){
        console.log("data loading")
       const  allDoctors= data.data
    console.log(allDoctors)
       setDoctors(allDoctors)
      }
    }
      catch(error){
        setMessage("unable to fetch doctors")
        console.log(error)
      }
    
  };
  fetchDoctors();
},[])



  const deleteDoctor = async (doctorId) => {
    try {
      
      const response = await axios.delete(`http://localhost:8080/api/doctors/${doctorId}`, {
        headers: {
          Authorization: `Bearer YOUR_ADMIN_TOKEN`, // Replace with the actual token
        },
        
      });
      setMessage(response.data.message);

      // Remove the deleted doctor from the state
      setDoctors(doctors.filter((doctor) => doctor._id !== doctorId));
    } catch (error) {
        alert("Failed to delete doctor")
      setMessage('Failed to delete doctor');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="doctor-container">
      <h2>Doctor List</h2>
      {message && <p>{message}</p>}
      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor?._id} doctor={doctor} onDelete={deleteDoctor} />
        ))}
      </div>
    </div>
    </>
  );
};

export default GetDoctor;
