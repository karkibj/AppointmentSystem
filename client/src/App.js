import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import GetDoctor from './pages/getDoctor.jsx';
import HomePage from './pages/HomePage.jsx';
import ManageDoctors from './pages/admin/ManageDoctor.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PrivateRoute from './Components/protectedRoutes.js';
import DoctorList from './pages/DoctorList.jsx';
import UserProfile from './pages/UserProfile.jsx';
const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path='/login' element={<Login />} />
                <Route path='find-doctors' element={<DoctorList/>}/>
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<HomePage />} />
                <Route path ='/profile' element={<UserProfile/>}/>

                {/* Protected Routes */}
                <Route path='/view-doctor' 
                    element={
                        <PrivateRoute>
                            <GetDoctor />
                        </PrivateRoute>
                    } 
                />
              
                <Route path='/manage-doctors' 
                    element={
                        <PrivateRoute requiredRole="admin">
                            <ManageDoctors />
                        </PrivateRoute>
                    } 
                />
                <Route path='/admin/dashboard' 
                    element={
                        <PrivateRoute requiredRole="admin">
                            <Dashboard />
                        </PrivateRoute>
                    } 
                />
            </Routes>
        </Router>
    );
};

export default App;
