import { createAction } from '@reduxjs/toolkit';

export const setErrorAction = createAction('ERROR/SET', (message: string) => {
  return {
    payload: {
      message,
      needToShow: true,
    },
  };
});

export const clearErrorAction = createAction('ERROR/CLEAR', () => {
  return {
    payload: {
      message: '',
      needToShow: false,
    },
  };
});
