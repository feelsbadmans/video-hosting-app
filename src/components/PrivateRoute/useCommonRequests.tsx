import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserProfileAction } from 'redux/actions/userProfile';
import { useAppSelector } from 'redux/hooks';

export const useCommonRequests = (canFetch: boolean) => {
  const dispatch = useDispatch();

  const {
    data: userProfileData,
    fetchStatus: userProfileFetchStatus,
    errorMsg: userProfileErrorMsg,
  } = useAppSelector((store) => store.userProfile);

  useEffect(() => {
    if (canFetch) {
      if (userProfileFetchStatus === 'initial') {
        const username = localStorage.getItem('username') || '';

        dispatch(getUserProfileAction(username));
      }
    }
  }, [canFetch, dispatch, userProfileFetchStatus]);

  return {
    error: userProfileErrorMsg,
    user: userProfileData,
  };
};
