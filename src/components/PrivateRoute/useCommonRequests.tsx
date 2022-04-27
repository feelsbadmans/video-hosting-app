import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserProfileAction } from 'redux/actions/userProfile';
import { useAppSelector } from 'redux/hooks';

export const useCommonRequests = (canFetch: boolean) => {
  const navigate = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    if (userProfileData && userProfileFetchStatus === 'fetched' && location.pathname === '/') {
      const { authorities } = userProfileData;

      if (authorities?.some((v) => v.name === 'ADMIN')) {
        navigate('/moderation');
      }

      if (authorities?.some((v) => v.name === 'VIDEO_CREATOR')) {
        navigate('/my-videos');
      }

      navigate('/videos');
    }
  }, [location.pathname, navigate, userProfileData, userProfileFetchStatus]);

  return {
    error: userProfileErrorMsg,
    user: userProfileData,
  };
};
