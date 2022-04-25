import React from 'react';

import css from './Main.module.scss';

//TODO: перенести на страницу авторизации
export const Main: React.FC = () => {
  return (
    <div className={css.container}>
      <h2>Video Hosting App</h2>
    </div>
  );
};
