import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from 'pages/Main';

import css from './App.module.scss';

export const App = () => {
  return (
    <div className={css.layout}>
      <div className={css.app}>
        <Router>
          <Routes>
            <Route path="" element={<Main />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};
