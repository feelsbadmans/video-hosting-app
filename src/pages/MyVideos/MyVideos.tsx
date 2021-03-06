import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LabeledValue } from 'antd/lib/select';
import { getAllGroups } from 'api/utilsApis';
import { VideoDto } from 'api/videos';
import { usePageState } from 'hooks/usePageState';
import { useAppSelector } from 'redux/hooks';

import { Button } from 'components/Button';
import { Pagination } from 'components/Pagination';
import { Spinner } from 'components/Spinner';
import { UploadModal } from 'components/UploadModal';
import { Video } from 'components/Video';

import css from './MyVideos.module.scss';

export const MyVideos: React.VFC = () => {
  const loadingRef = useRef(false);

  const { data, fetchStatus } = useAppSelector((store) => store.userProfile);

  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoDto | undefined>(undefined);

  const { pageState, handleSetPage } = usePageState({ page: 1, size: 18 });

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

  const videos = useMemo(
    () => data?.videos.slice(pageState.size * (pageState.page - 1), pageState.size * pageState.page) || [],
    [data?.videos, pageState.page, pageState.size],
  );

  if (fetchStatus === 'error') {
    return <h1>Доступных видео пока нет :(</h1>;
  }

  return (
    <div className={css.container}>
      {loadingRef.current || !data ? (
        <div className={css.spinner}>
          <Spinner theme="light" />
        </div>
      ) : (
        <>
          <div className={css.videos}>
            <Button className={css.buttonUpload} onClick={() => setUploadModalVisible(true)}>
              Загрузить видео
            </Button>
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
            onChange={(p) => {
              if (fetchStatus !== 'fetching') {
                handleSetPage(p);
              }
            }}
            current={pageState.page}
            total={data?.videos.length}
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
          }}
        />
      )}
    </div>
  );
};
