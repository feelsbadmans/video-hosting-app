import React, { useCallback, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { NavBar } from 'components/NavBar/index';
import { Spinner } from 'components/Spinner';

import { useCommonRequests } from './useCommonRequests';

import css from './PrivateRoute.module.scss';

export const PrivateRoute: React.FC = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const canFetch = !!token && !!username;

  const { user, error, fetchStatus } = useCommonRequests(canFetch);

  useEffect(() => {
    if (!canFetch) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }, [canFetch]);

  const render = useCallback(() => {
    if (fetchStatus === 'fetching') {
      return (
        <div className={css.spinnerContainer}>
          <div className={css.spinner}>
            <Spinner theme={'light'} />
          </div>
        </div>
      );
    }

    if (user) {
      if (!user.enabled) {
        return (
          <div className={css.spinnerContainer}>
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
            </div>
          </div>
        );
      }

      if (!user.accountNonExpired || !user.accountNonLocked) {
        return (
          <div className={css.spinnerContainer}>
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
            </div>
          </div>
        );
      }

      return (
        <>
          <NavBar user={user} />
          {children}
        </>
      );
    }

    if (error) {
      return (
        <div className={css.spinnerContainer}>
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
                  window.location.reload();
                }}
              >
                перезайти
              </span>
              &nbsp;в приложение
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className={css.spinnerContainer}>
        <div className={css.spinner}>
          <Spinner theme={'light'} />
        </div>
      </div>
    );
  }, [fetchStatus, error, user, navigate, children]);

  return canFetch ? <>{render()}</> : <Navigate to="/auth" />;
};
