import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { LabeledValue } from 'antd/lib/select';
import { deleteVideo, editVideo, uploadVideo, VideoDto } from 'api/videos';
import { setErrorAction } from 'redux/actions/error';
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
            name: filename,
            description: values.description || '',
            source: video.source,
          },
          video.id as number,
          values.allowedGroups || [],
        ).catch((e) => {
          loadingRef.current = false;
          dispatch(setErrorAction(e.response?.data?.errorMessage ?? e.message));
        });
      } else {
        await uploadVideo(
          {
            name: filename,
            description: values.description || '',
            source: values.source || '',
            file: videoFile,
          },
          userProfile?._links?.self.href || 'https://video-hosting-back.herokuapp.com/users/3',
          values.allowedGroups || [],
        ).catch((e) => {
          loadingRef.current = false;
          dispatch(setErrorAction(e.response?.data?.errorMessage ?? e.message));
        });
      }
      loadingRef.current = false;
      dispatch(getUserProfileAction(userProfile?.username || 'admin'));
    },
    [video, dispatch, userProfile?.username, userProfile?._links?.self.href, filename, videoFile],
  );

  const onDelete = useCallback(async () => {
    deleteRef.current = true;
    if (video) {
      await deleteVideo(video.id as number).catch((e) => {
        deleteRef.current = false;
        dispatch(setErrorAction(e.response?.data?.errorMessage ?? e.message));
      });
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
            label="??????????????????"
            placeholder="???????????????? ????????"
            type="file"
            accept="video/*"
            onChange={handleChangeFile}
          />
        )}
        {!videoFile && <Input name="source" label="???????????? ???? ??????????" placeholder="???????????????? ???????????? ???? ??????????" />}
        <Input
          name="name"
          label="????????????????"
          placeholder="?????????????? ???????????????? ??????????"
          onChange={onChangeName}
          value={filename}
        />
        <Textarea name="description" label="????????????????" placeholder="?????????????? ????????????????" />
        <Select
          name="allowedGroups"
          label="???????????????? ?????? ??????????"
          placeholder="???????????????? ????????????"
          mode="multiple"
          data={groups}
        />
        <Button view="primary" size="m" type="submit" isLoading={loadingRef.current}>
          ??????????????????
        </Button>
      </>
    );
  };

  const renderEdit = () => {
    return (
      <>
        <Input
          name="name"
          label="????????????????"
          placeholder="?????????????? ???????????????? ??????????"
          onChange={onChangeName}
          value={filename}
        />
        <Textarea name="description" label="????????????????" placeholder="?????????????? ????????????????" />
        <Select
          name="allowedGroups"
          label="???????????????? ?????? ??????????"
          placeholder="???????????????? ????????????"
          mode="multiple"
          data={groups}
        />
        <div className={css.buttonsContainer}>
          <Button view="primary" size="m" type="submit" isLoading={loadingRef.current}>
            ??????????????????????????
          </Button>
          <Button view="secondary" size="m" type="button" isLoading={deleteRef.current} onClick={onDelete}>
            ??????????????
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
        validate={video ? validateEditVideoForm(filename) : validateVideoForm(filename)}
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
