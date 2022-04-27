import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { UserProfile } from 'api/userProfile';

import { NavButton } from './components/NavButton';
import { User } from './components/User';

import css from './NavBar.module.scss';

type NavBarProps = {
  user: UserProfile;
};

type NavButton = {
  path: string;
  text: string;
};

export const NavBar: React.FC<NavBarProps> = ({ user }) => {
  const { pathname } = useLocation();

  const navButtons = useMemo(() => {
    const { authorities } = user;
    const buttons: NavButton[] = [];

    authorities?.forEach((v) => {
      if (v.name === 'ORDINARY_USER') {
        buttons.push({ text: 'Доступные видео', path: 'videos' });
      }
      if (v.name === 'VIDEO_CREATOR') {
        buttons.push({ text: 'Мои видео', path: 'my-videos' });
      }
      if (v.name === 'ADMIN') {
        buttons.push({ text: 'Модерация', path: 'moderation' });
      }
    });

    buttons.push({ text: 'Информация', path: 'info' });

    return buttons;
  }, [user]);

  return (
    <div className={css.container}>
      <h2 className={css.logo}>Video Hosting App</h2>
      <div className={css.navButtons}>
        {navButtons.map((v) => (
          <NavButton active={!!pathname.length && v.path === pathname.split('/')[1]} path={v.path} key={v.path}>
            {v.text}
          </NavButton>
        ))}
      </div>
      <User user={user} />
    </div>
  );
};
