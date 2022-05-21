import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePageState } from 'hooks/usePageState';
import { getAllVideosByGroupIdAction } from 'redux/actions/videos';
import { useAppSelector } from 'redux/hooks';

import { Pagination } from 'components/Pagination';
import { Spinner } from 'components/Spinner';
import { Video } from 'components/Video';

import css from './Videos.module.scss';

export const Videos: React.VFC = () => {
  const dispatch = useDispatch();

  const { fetchStatus, data } = useAppSelector((store) => store.videos);
  const user = useAppSelector((store) => store.userProfile);

  const { pageState, handleSetPage, handleSetSize } = usePageState({ page: 1, size: 18 });

  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (user.fetchStatus === 'fetched' && user.data?.group) {
      dispatch(getAllVideosByGroupIdAction({ id: user.data.group.id || 1 }));
      setFetched(true);
    }
  }, [dispatch, user]);

  const videos = useMemo(
    () => data?.slice(pageState.size * (pageState.page - 1), pageState.size * pageState.page) || [],
    [data, pageState.page, pageState.size],
  );

  if (fetchStatus === 'error') {
    return <h1>Доступных видео пока нет :(</h1>;
  }

  return (
    <div className={css.container}>
      {fetchStatus === 'fetching' || !videos || !fetched ? (
        <div className={css.spinner}>
          <Spinner theme="light" />
        </div>
      ) : (
        <>
          <div className={css.videos}>
            {videos.map((v) => (
              <Video data={v} key={v._links?.self.href || v.source} />
            ))}
          </div>
          <Pagination
            onChange={(p, s) => {
              handleSetPage(p);
              handleSetSize(s);
            }}
            current={pageState.page}
            total={data?.length}
            pageSize={pageState.size}
          />
        </>
      )}
    </div>
  );
};
