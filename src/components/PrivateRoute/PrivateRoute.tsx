import React, { useCallback, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { NavBar } from 'components/NavBar';
import { Spinner } from 'components/Spinner';

import { useCommonRequests } from './useCommonRequests';

import css from './PrivateRoute.module.scss';

export const PrivateRoute: React.FC = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const canFetch = !!token && !!username;

  const { user, error } = useCommonRequests(canFetch);

  useEffect(() => {
    if (!canFetch) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }, [canFetch]);

  const render = useCallback(() => {
    if (error) {
      return (
        <div className={css.errorContainer}>
          <h1 className={css.errorHeader}>Ошибка!</h1>
          <p className={css.errorMessage}>{error}</p>
          <p className={css.errorMessage}>
            Попробуйте&nbsp;
            <span
              className={css.exitLink}
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                navigate('/auth');
              }}
            >
              перезайти
            </span>
            &nbsp;в приложение
          </p>
        </div>
      );
    }

    if (!user?.enabled) {
      <div className={css.errorContainer}>
        <h1 className={css.errorHeader}>Ошибка!</h1>
        <p className={css.errorMessage}>Данный аккаунт отключен</p>
        <p className={css.errorMessage}>
          Попробуйте&nbsp;
          <span
            className={css.exitLink}
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('username');
              navigate('/auth');
            }}
          >
            перезайти
          </span>
          &nbsp;в приложение
        </p>
      </div>;
    }

    if (!user?.accountNonExpired || !user.accountNonLocked) {
      <div className={css.errorContainer}>
        <h1 className={css.errorHeader}>Ошибка!</h1>
        <p className={css.errorMessage}>Данный аккаунт заблокирован</p>
        <p className={css.errorMessage}>
          Попробуйте&nbsp;
          <span
            className={css.exitLink}
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('username');
              navigate('/auth');
              window.location.reload();
            }}
          >
            перезайти
          </span>
          &nbsp;в приложение
        </p>
      </div>;
    }

    if (user) {
      return (
        <>
          <NavBar user={user} />
          {children}
        </>
      );
    }

    return (
      <div className={css.spinner}>
        <Spinner theme={'light'} />
      </div>
    );
  }, [error, user, navigate, children]);

  return canFetch ? <>{render()}</> : <Navigate to="/auth" />;
};
