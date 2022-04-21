import React from 'react';
import { PathRouteProps, Route } from 'react-router-dom';

export const PrivateRoute: React.FC<PathRouteProps> = ({ caseSensitive, children, element, index, path }) => {
  const token = localStorage.getItem('login');

  //TODO: return to auth
  if (token === null) {
    return null;
  }

  return (
    <Route caseSensitive={caseSensitive} element={element} index={index} path={path}>
      {children}
    </Route>
  );
};
