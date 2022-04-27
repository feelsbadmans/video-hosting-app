import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from 'api/userProfile';

import { Button } from 'components/Button';

import css from './User.module.scss';

type UserProps = {
  user: UserProfile;
};

export const User: React.FC<UserProps> = ({ user }) => {
  const navigate = useNavigate();

  const role = useMemo(() => {
    const { authorities } = user;

    if (authorities?.some((v) => v.name === 'ADMIN')) {
      return 'Модератор';
    }

    if (authorities?.some((v) => v.name === 'VIDEO_CREATOR')) {
      return 'Контентмейкер';
    }

    return 'Пользователь';
  }, [user]);

  return (
    <div className={css.container}>
      <div className={css.userInfo}>
        <span className={css.username}>{user.username}</span>
        <span className={css.role}>{role}</span>
      </div>
      <img className={css.img} src={require('assets/jpg/user.jpeg')} />
      <Button
        size="s"
        view="outlineSecondary"
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          navigate('/auth');
          window.location.reload();
        }}
      >
        Выход
      </Button>
    </div>
  );
};
