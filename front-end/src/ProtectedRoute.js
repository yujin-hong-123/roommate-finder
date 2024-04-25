import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Use a state or effect hook if necessary to detect changes to the token
    const isAuthenticated = localStorage.getItem('token'); // Checks if the token is present in localStorage
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
