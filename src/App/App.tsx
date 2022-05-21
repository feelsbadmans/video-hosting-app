import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import cn from 'classnames';
import { useShowError } from 'hooks/useShowError';
import { AuthPage, RegisterPage } from 'pages/Auth';
import { Info } from 'pages/Info';
import { Moderation } from 'pages/Moderation';
import { MyVideos } from 'pages/MyVideos';
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
            <Route
              path="/auth"
              element={
                <div className={cn(css.center, css.app)}>
                  <AuthPage />
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div className={cn(css.center, css.app)}>
                  <RegisterPage />
                </div>
              }
            />

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
            <Route
              path="/my-videos"
              element={
                <PrivateRoute>
                  <MyVideos />
                </PrivateRoute>
              }
            />
            <Route
              path="/moderation"
              element={
                <PrivateRoute>
                  <Moderation />
                </PrivateRoute>
              }
            />

            <Route
              path="info"
              element={
                <div className={cn(css.center, css.app)}>
                  <PrivateRoute>
                    <Info />
                  </PrivateRoute>
                </div>
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
};
