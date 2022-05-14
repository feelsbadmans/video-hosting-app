import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { LabeledValue } from 'antd/lib/select';
import { deleteVideo, editVideo, uploadVideo, VideoDto } from 'api/videos';
import { getUserProfileAction } from 'redux/actions/userProfile';
import { useAppSelector } from 'redux/hooks';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Modal } from 'components/Modal';
import { Select } from 'components/Select';
import { Textarea } from 'components/Textarea';

import { VideoFormType } from './types';
import { getInitGroups } from './utils';
import { validateEditVideoForm, validateVideoForm } from './validate';

import css from './UploadModal.module.scss';

type UploadModalProps = { video?: VideoDto; onClose: () => void; groups: LabeledValue[] };

export const UploadModal: React.FC<UploadModalProps> = ({ video, onClose, groups }) => {
  const dispatch = useDispatch();

  const loadingRef = useRef(false);
  const deleteRef = useRef(false);

  const [videoFile, setVideoFile] = useState<File | undefined>(undefined);
  const [filename, setFilename] = useState(video?.name || '');

  const handleChangeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);

    if (file) {
      setVideoFile(file);
      setFilename(file.name);
    }
  }, []);

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.value);
  }, []);

  const { fetchStatus, data: userProfile } = useAppSelector((state) => state.userProfile);

  const initialValues = useMemo(
    () => ({
      name: video?.name || '',
      description: video?.description || '',
      allowedGroups: getInitGroups(video?.allowedGroups),
    }),
    [video],
  );

  const onSubmit = useCallback(
    async (values: VideoFormType) => {
      loadingRef.current = true;
      if (video) {
        await editVideo(
          {
            name: values.name,
            description: values.description || '',
            source: video.source,
          },
          video.id as number,
          values.allowedGroups || [],
        );
      } else {
        await uploadVideo(
          {
            name: values.name,
            description: values.description || '',
            source: values.source || '',
            file: videoFile,
          },
          userProfile?._links?.self.href || 'https://video-hosting-back.herokuapp.com/users/3',
          values.allowedGroups || [],
        );
      }
      loadingRef.current = false;
      dispatch(getUserProfileAction(userProfile?.username || 'admin'));
    },
    [videoFile, userProfile, dispatch, video],
  );

  const onDelete = useCallback(async () => {
    deleteRef.current = true;
    if (video) {
      await deleteVideo(video.id as number);
    }
    deleteRef.current = false;
    dispatch(getUserProfileAction(userProfile?.username || 'admin'));
  }, [dispatch, userProfile, video]);

  useEffect(() => {
    if (fetchStatus === 'fetching') {
      onClose();
    }
  }, [fetchStatus, onClose]);

  const renderUpload = (values: VideoFormType) => {
    return (
      <>
        {!values.source && (
          <Input
            name="videoFile"
            label="Видеофайл"
            placeholder="выберите файл"
            type="file"
            accept="video/*"
            onChange={handleChangeFile}
          />
        )}
        {!videoFile && <Input name="source" label="Ссылка на видео" placeholder="вставьте ссылку на видео" />}
        <Input
          name="name"
          label="Название"
          placeholder="введите название видео"
          onChange={onChangeName}
          value={filename}
        />
        <Textarea name="description" label="Описание" placeholder="введите описание" />
        <Select
          name="allowedGroups"
          label="Доступно для групп"
          placeholder="выберите группы"
          mode="multiple"
          data={groups}
        />
        <Button view="primary" size="m" type="submit" isLoading={loadingRef.current}>
          Загрузить
        </Button>
      </>
    );
  };

  const renderEdit = () => {
    return (
      <>
        <Input
          name="name"
          label="Название"
          placeholder="введите название видео"
          onChange={onChangeName}
          value={filename}
        />
        <Textarea name="description" label="Описание" placeholder="введите описание" />
        <Select
          name="allowedGroups"
          label="Доступно для групп"
          placeholder="выберите группы"
          mode="multiple"
          data={groups}
        />
        <div className={css.buttonsContainer}>
          <Button view="primary" size="m" type="submit" isLoading={loadingRef.current}>
            Редактировать
          </Button>
          <Button view="secondary" size="m" type="button" isLoading={deleteRef.current} onClick={onDelete}>
            Удалить
          </Button>
        </div>
      </>
    );
  };

  return (
    <Modal onClose={onClose}>
      <Form<VideoFormType>
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={video ? validateEditVideoForm : validateVideoForm}
      >
        {({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <div className={css.form}>
              {!video && renderUpload(values)}
              {video && renderEdit()}
            </div>
          </form>
        )}
      </Form>
    </Modal>
  );
};
