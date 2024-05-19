
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../services/utils/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Route {...rest} element={element} /> : <Navigate to="/register" />;
};

export default PrivateRoute;
