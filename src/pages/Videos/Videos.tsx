import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { usePageState } from 'hooks/usePageState';
import { getAllVideosAction } from 'redux/actions/videos';
import { useAppSelector } from 'redux/hooks';

import { Spinner } from 'components/Spinner';

export const Videos: React.VFC = () => {
  const dispatch = useDispatch();

  const { fetchStatus, pageInfo } = useAppSelector((store) => store.videos);
  const user = useAppSelector((store) => store.userProfile);

  const [needResize, setNeedResize] = useState(false);

  const { pageState, handleSetPage, handleSetSize } = usePageState({ page: 1, size: 20 });

  useEffect(() => {
    if (fetchStatus === 'initial' && user.fetchStatus === 'fetched' && user.data?.group) {
      dispatch(getAllVideosAction({ groupname: user.data.group.name }));
    }
  }, [dispatch, fetchStatus, user]);

  useEffect(() => {
    if (needResize) {
      dispatch(
        getAllVideosAction({
          groupname: user?.data?.group?.name || '',
          pageInfo: { number: pageState.page - 1, size: pageState.size },
        }),
      );
    }
  }, [dispatch, pageState.page, pageState.size, user, needResize]);

  if (fetchStatus === 'error') {
    return <span>Ошибка</span>;
  }

  return (
    <div>
      {fetchStatus !== 'fetched' ? (
        <Spinner />
      ) : (
        <Pagination
          onChange={(p, s) => {
            handleSetPage(p);
            handleSetSize(s);
            setNeedResize(true);
          }}
          current={pageState.page}
          total={pageInfo?.totalElements}
          pageSize={pageState.size}
        />
      )}
    </div>
  );
};
