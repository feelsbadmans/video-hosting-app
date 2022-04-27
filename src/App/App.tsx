import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useShowError } from 'hooks/useShowError';
import { AuthPage, RegisterPage } from 'pages/Auth';
import { Info } from 'pages/Info';
import { Videos } from 'pages/Videos';

import { PrivateRoute } from 'components/PrivateRoute';

import css from './App.module.scss';

export const App = () => {
  useShowError();

  return (
    <div className={css.layout}>
      <div className={css.app}>
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Private routes */}
            <Route path="" element={<PrivateRoute />} />
            <Route
              path="/videos"
              element={
                <PrivateRoute>
                  <Videos />
                </PrivateRoute>
              }
            />
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
