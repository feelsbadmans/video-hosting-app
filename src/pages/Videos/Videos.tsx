import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePageState } from 'hooks/usePageState';
import { getAllVideosAction } from 'redux/actions/videos';
import { useAppSelector } from 'redux/hooks';

import { Pagination } from 'components/Pagination';
import { Spinner } from 'components/Spinner';
import { Video } from 'components/Video';

import css from './Videos.module.scss';

export const Videos: React.VFC = () => {
  const dispatch = useDispatch();

  const { fetchStatus, pageInfo, data } = useAppSelector((store) => store.videos);
  const user = useAppSelector((store) => store.userProfile);

  const [needResize, setNeedResize] = useState(false);

  const { pageState, handleSetPage, handleSetSize } = usePageState({ page: 1, size: 18 });

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
    return <h1>Доступных видео пока нет :(</h1>;
  }

  return (
    <div className={css.container}>
      {fetchStatus === 'fetching' || !data ? (
        <div className={css.spinner}>
          <Spinner theme="light" />
        </div>
      ) : (
        <div className={css.videos}>
          {data.map((v) => (
            <Video data={v} key={v._links?.self.href || v.source} />
          ))}
        </div>
      )}
      <Pagination
        onChange={(p, s) => {
          if (fetchStatus !== 'fetching') {
            handleSetPage(p);
            handleSetSize(s);
            setNeedResize(true);
          }
        }}
        current={pageState.page}
        total={pageInfo?.totalElements}
        pageSize={pageState.size}
      />
    </div>
  );
};
