import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LabeledValue } from 'antd/lib/select';
import { getAllGroups } from 'api/utilsApis';
import { VideoDto } from 'api/videos';
import { usePageState } from 'hooks/usePageState';
import { getAllVideosAction } from 'redux/actions/videos';
import { useAppSelector } from 'redux/hooks';

import { Pagination } from 'components/Pagination';
import { Spinner } from 'components/Spinner';
import { UploadModal } from 'components/UploadModal';
import { Video } from 'components/Video';

import css from './ModerationVideos.module.scss';

export const ModerationVideos: React.VFC = () => {
  const loadingRef = useRef(false);
  const dispatch = useDispatch();

  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoDto | undefined>(undefined);

  const [userGroups, setUserGroups] = useState<LabeledValue[]>([]);

  useEffect(() => {
    const getGroups = async () => {
      loadingRef.current = true;
      const groups = await getAllGroups();
      loadingRef.current = false;
      setUserGroups(groups || []);
    };
    void getGroups();
  }, []);

  const { fetchStatus: fetchVideo, pageInfo, allData: videos } = useAppSelector((store) => store.videos);

  const { pageState, handleSetPage, handleSetSize } = usePageState({ page: 1, size: 18 });

  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    dispatch(
      getAllVideosAction({
        pageInfo: { number: pageState.page - 1, size: pageState.size },
      }),
    );
    setFetched(true);
  }, [dispatch, pageState.size, pageState.page]);

  if (fetchVideo === 'error') {
    return <h1>Доступных видео пока нет :(</h1>;
  }

  return (
    <div className={css.container}>
      {loadingRef.current || !videos || !fetched ? (
        <div className={css.spinner}>
          <Spinner theme="light" />
        </div>
      ) : (
        <>
          <div className={css.videos}>
            {videos.map((v) => (
              <Video
                data={v}
                key={v._links?.self.href || v.source}
                isEditable
                onEditBtnClick={(v) => {
                  {
                    setSelectedVideo(v);
                    setUploadModalVisible(true);
                  }
                }}
                needOutsideClick={!uploadModalVisible}
              />
            ))}
          </div>
          <Pagination
            onChange={(p, s) => {
              if (p !== pageState.page) {
                handleSetPage(p);
              }
              if (s !== pageState.size) {
                handleSetSize(s);
              }
            }}
            current={pageState.page}
            total={pageInfo?.totalElements}
            pageSize={pageState.size}
          />
        </>
      )}
      {uploadModalVisible && (
        <UploadModal
          video={selectedVideo}
          groups={userGroups}
          onClose={() => {
            setSelectedVideo(undefined);
            setUploadModalVisible(false);
            dispatch(
              getAllVideosAction({
                pageInfo: { number: pageState.page - 1, size: pageState.size },
              }),
            );
          }}
        />
      )}
    </div>
  );
};
