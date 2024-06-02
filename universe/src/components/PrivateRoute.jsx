import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../services/utils/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // const { isAuthenticated } = true;
  return isAuthenticated ? children : <Navigate to="/register" />;
  // return children;
};

export default PrivateRoute;

