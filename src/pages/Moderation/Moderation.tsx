import React, { useState } from 'react';

import { Button } from 'components/Button';

import { ModerationUsers } from './ModerationUsers';
import { ModerationVideos } from './ModerationVideos';

import css from './Moderation.module.scss';

type ModerationMode = 'users' | 'videos';

export const Moderation = () => {
  const [mode, setMode] = useState<ModerationMode>('videos');

  const buttonText = mode === 'users' ? 'Перейти к видео' : 'Перейти к пользователям';
  const headerText = mode === 'users' ? 'Модерация пользователей' : 'Модерация видео';

  const toggleMode = () => {
    setMode((prev) => (prev === 'users' ? 'videos' : 'users'));
  };

  const renderContent = () => {
    if (mode === 'videos') {
      return <ModerationVideos />;
    }

    return <ModerationUsers />;
  };

  return (
    <div className={css.container}>
      <div className={css.headerContainer}>
        <h1>{headerText}</h1>
        <Button view={mode === 'users' ? 'primary' : 'outlineSecondary'} onClick={toggleMode}>
          {buttonText}
        </Button>
      </div>
      {renderContent()}
    </div>
  );
};
