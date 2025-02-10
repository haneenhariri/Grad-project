import React from 'react';
import { Navigate } from 'react-router-dom';
import { getSecureCookie } from '../utils/cookiesHelper';

interface RoleProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRoles, children }) => {
  const token = getSecureCookie('token');
  const userRole = getSecureCookie('role'); 

  if (!token || !userRole) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
