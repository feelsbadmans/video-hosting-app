import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute: React.FC = ({ children }) => {
  const token = localStorage.getItem('login');

  return token ? <>{children}</> : <Navigate to="/auth" />;
};
