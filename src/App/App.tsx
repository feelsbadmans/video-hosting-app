import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthPage, RegisterPage } from 'pages/Auth';
import { Info } from 'pages/Info';

import { ErrorMessage } from 'components/ErrorMessage';
import { PrivateRoute } from 'components/PrivateRoute';

import css from './App.module.scss';

export const App = () => {
  return (
    <div className={css.layout}>
      <div className={css.app}>
        <Router>
          <ErrorMessage />
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Private routes */}
            <Route path="" element={<PrivateRoute />} />
            <Route path="/videos" element={<PrivateRoute></PrivateRoute>} />
            <Route path="/my-videos" element={<PrivateRoute></PrivateRoute>} />
            <Route path="/moderation" element={<PrivateRoute></PrivateRoute>} />
            <Route
              path="info"
              element={
                <PrivateRoute>
                  <Info />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
};
