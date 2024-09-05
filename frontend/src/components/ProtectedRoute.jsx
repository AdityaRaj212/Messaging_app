// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    // Redirect them to the /login page if not logged in
    return <Navigate to="/login" />;
  }

  // Render the nested routes (Outlet) if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
