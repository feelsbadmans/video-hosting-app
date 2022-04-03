import React from 'react';
import { Button } from 'antd';

import css from './Main.module.scss';

export const Main: React.FC = () => {
  return (
    <div className={css.container}>
      <h2>Видео-Хостинг лекций</h2>
      <Button
        className={css.button}
        onClick={() => {
          alert('biba');
        }}
      >
        Кнопка
      </Button>
    </div>
  );
};
