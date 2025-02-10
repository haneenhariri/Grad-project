import React from "react";
import { Navigate } from "react-router-dom";
import { getSecureCookie } from "../utils/cookiesHelper";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = getSecureCookie("token");

  if (!token) {
    
    return <Navigate to="/auth/login" />;
  }

  
  return <>{children}</>;
};

export default ProtectedRoute;
