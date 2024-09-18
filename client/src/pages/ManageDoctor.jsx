import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Navbar';// Adjust the path based on your project structure


const ManageDoctors = () => {

  const [doctors, setDoctors] = useState([]);

  useEffect(()=>{
    const fetchDoctors=async ()=>{
      try{
        const response=await fetch("http://localhost:8080/api/doctor/")
        const data=await response.json()
        console.log(data)
        if(response.ok){
          const allDoctors=data.data
          console.log(allDoctors)
          setDoctors(allDoctors)
        }
      }
      catch(err){
        alert("problem in getting data")
        console.log(err)
      }
      
    };
    fetchDoctors();
  },[])

  const [showAddForm, setShowAddForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    specialization: '',
  });

  // Handle Add Doctor Form Submission
  // const handleAddDoctor = (e) => {
  //   e.preventDefault();
  //   const newDoc = {
  //     ...newDoctor,
  //     id: doctors.length + 1,
  //     profilePicture: 'https://via.placeholder.com/40', // Placeholder image for now
  //   };
  //   setDoctors([...doctors, newDoc]);
  //   setShowAddForm(false);
  //   setNewDoctor({ name: '', email: '', phone: '', password: '', specialization: '' });
  // };

  // Handle Input Change
  const handleInputChange = (e) => {
    setNewDoctor({ ...newDoctor, 
      [e.target.name]: e.target.value });
  };
  
  const handleAddDoctor = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('accessToken'); 
      console.log(token)
  
      const response = await fetch("http://localhost:8080/api/doctor/createDoctor", {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${token}` // Include the Bearer token for authentication
        },
        body: JSON.stringify(newDoctor) // Assuming `newDoctor` contains the doctor info
      });
  
      const sentData = await response.json();
  
      if (response.ok) {
        console.log("Doctor added successfully:", sentData.data);
      } else {
        console.log("Error:", sentData.message);
      }
      
    } catch (err) {
      console.log('Error:', err);
    }
  };
  


  const handleDeleteDoctor = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/doctor/deleteDoctor/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json',
        },
      });

      if (response.ok) {
        setDoctors(doctors.filter((doctor) => doctor._id !== id));
      } else {
        alert("Error deleting doctor");
      }
    } catch (err) {
      alert("Error:", err);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-6">Manage Doctors</h1>

        {/* Doctor Table */}
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-200 border-b">Profile</th>
              <th className="py-3 px-4 bg-gray-200 border-b">Name</th>
              <th className="py-3 px-4 bg-gray-200 border-b">Email</th>
              <th className="py-3 px-4 bg-gray-200 border-b">Phone</th>
              <th className="py-3 px-4 bg-gray-200 border-b">Specialization</th>
              <th className="py-3 px-4 bg-gray-200 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td className="py-3 px-4 border-b text-center">
                  <img src={doctor.profilePicture} alt={doctor.name} className="rounded-full w-10 h-10" />
                </td>
                <td className="py-3 px-4 border-b">{doctor?.userId?.name}</td>
                <td className="py-3 px-4 border-b">{doctor?.userId?.email}</td>
                <td className="py-3 px-4 border-b">{doctor?.userId?.phone}</td>
                <td className="py-3 px-4 border-b">{doctor?.specialization}</td>
                <td className="py-3 px-4 border-b space-x-2">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded">Edit</button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                    onClick={()=>handleDeleteDoctor(doctor._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Button to Show Add Doctor Form */}
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Close Form' : 'Add Doctor'}
        </button>

        {/* Add Doctor Form */}
        {showAddForm && (
          <form className="mt-6 bg-white p-6 shadow-md rounded" onSubmit={handleAddDoctor}>
            <h2 className="text-xl font-semibold mb-4">Add New Doctor</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newDoctor.name}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newDoctor.email}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={newDoctor.phone}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={newDoctor.password}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={newDoctor.specialization}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
                required
              />
               
            </div>
            <button
              type="submit"
              className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Add Doctor
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ManageDoctors;
