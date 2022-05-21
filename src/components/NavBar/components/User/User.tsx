import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from 'api/userProfile';
import { UserEntity } from 'api_generated';
import cn from 'classnames';

import { Button } from 'components/Button';

import css from './User.module.scss';

type NavBarProps = {
  needAuthorities: true;
  user: UserProfile;
  className?: string;
  needExitButton?: boolean;
};

type VidProps = {
  needAuthorities: false;
  user: UserEntity;
  className?: string;
  needExitButton?: boolean;
};

type UserProps = NavBarProps | VidProps;

export const User: React.FC<UserProps> = ({ needExitButton = true, user, needAuthorities, className }) => {
  const navigate = useNavigate();

  const role = useMemo(() => {
    if (needAuthorities) {
      const { authorities } = user;

      if (authorities?.some((v) => v.name === 'ADMIN')) {
        return 'Модератор';
      }

      if (authorities?.some((v) => v.name === 'VIDEO_CREATOR')) {
        return 'Контентмейкер';
      }

      return 'Пользователь';
    }
  }, [user, needAuthorities]);

  return (
    <div className={cn(css.container, className)}>
      <div className={css.userInfo}>
        <span className={css.username}>{user.username}</span>
        <span className={css.role}>{role}</span>
      </div>
      <img className={css.img} src={require('assets/jpg/user.jpeg')} />
      {needExitButton && (
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
      )}
    </div>
  );
};
