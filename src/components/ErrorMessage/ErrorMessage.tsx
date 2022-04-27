import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { clearErrorAction } from 'redux/actions/error';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import css from './ErrorMessage.module.scss';

export const ErrorMessage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { needToShow, message } = useAppSelector((state) => state.error);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (needToShow) {
      setAnimated(true);
      setTimeout(() => {
        setAnimated(false);
      }, 5000);

      setTimeout(() => {
        dispatch(clearErrorAction());
      }, 6000);
    }
  }, [needToShow, dispatch, message]);

  return (
    <>
      {needToShow && (
        <div className={cn(css.notification, animated && css.shown)}>
          <h2 className={css.errorHeader}>Ошибка!</h2>
          <span className={css.errorMsg}>{message}</span>
        </div>
      )}
    </>
  );
};
