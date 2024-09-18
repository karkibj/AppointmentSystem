import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('userRole');

    if (!token) {
        // If there's no token, redirect to login
        return <Navigate to="/login" />;
    }

    if (requiredRole && userRole !== requiredRole) {
        // If user role doesn't match, redirect to an unauthorized page
        return <Navigate to="/unauthorized" />;
    }

    // If the token and role are valid, allow access
    return children;
};

export default PrivateRoute;
