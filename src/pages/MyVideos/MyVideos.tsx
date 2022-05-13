import React, { useState } from 'react';
import { VideoDto } from 'api/videos';
import { usePageState } from 'hooks/usePageState';
// import { useDispatch } from 'react-redux';
// import { usePageState } from 'hooks/usePageState';
// import { getAllVideosAction } from 'redux/actions/videos';
import { useAppSelector } from 'redux/hooks';

import { Button } from 'components/Button';
import { DownloadModal } from 'components/DownloadModal';
import { Pagination } from 'components/Pagination';
import { Spinner } from 'components/Spinner';
import { Video } from 'components/Video';

import css from './MyVideos.module.scss';

export const MyVideos: React.VFC = () => {
  // const dispatch = useDispatch();

  const { data, fetchStatus } = useAppSelector((store) => store.userProfile);

  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoDto | undefined>(undefined);

  const { pageState, handleSetPage } = usePageState({ page: 1, size: 18 });

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
          <Button className={css.buttonDownload} onClick={() => setDownloadModalVisible(true)}>
            Загрузить видео
          </Button>
          {data.videos.map((v) => (
            <Video
              data={v}
              key={v._links?.self.href || v.source}
              isEditable
              onEditBtnClick={(v) => {
                {
                  setSelectedVideo(v);
                  setDownloadModalVisible(true);
                }
              }}
            />
          ))}
        </div>
      )}
      {downloadModalVisible && (
        <DownloadModal
          video={selectedVideo}
          onClose={() => {
            setSelectedVideo(undefined);
            setDownloadModalVisible(false);
          }}
        />
      )}
      <Pagination
        onChange={(p) => {
          if (fetchStatus !== 'fetching') {
            handleSetPage(p);
          }
        }}
        current={pageState.page}
        total={data?.videos.length}
        pageSize={pageState.size}
      />
    </div>
  );
};
