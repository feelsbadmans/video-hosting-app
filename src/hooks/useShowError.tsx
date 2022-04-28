import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearErrorAction } from 'redux/actions/error';
import { useAppSelector } from 'redux/hooks';

import { showNotification } from 'components/ShowNotification/ShowNotification';

export const useShowError = () => {
  const dispatch = useDispatch();
  const { needToShow, message } = useAppSelector((store) => store.error);

  useEffect(() => {
    if (needToShow) {
      void showNotification({ message, type: 'error', duration: 4 });
      dispatch(clearErrorAction());
    }
  }, [needToShow, dispatch, message]);
};
