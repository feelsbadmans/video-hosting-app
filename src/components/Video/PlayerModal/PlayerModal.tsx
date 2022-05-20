import React, { useCallback } from 'react';
import { VideoDto } from 'api/videos';
import { UserEntity } from 'api_generated';

import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { User } from 'components/NavBar/components/User';

import { VideoProps } from '../Video';

import css from './PlayerModal.module.scss';

type PlayerModalProps = VideoProps & {
  onClose: () => void;
  isEditable: boolean;
  onEditBtnClick: (data: VideoDto) => void;
};

export const PlayerModal: React.FC<PlayerModalProps> = ({ data, onClose, isEditable, onEditBtnClick }) => {
  const getVideo = () => {
    let src = '';
    if (data.source.includes('youtube')) {
      src = data.source.replace('watch?v=', 'embed/');
      src = src.split('&')[0];

      return <iframe id="ytplayer" className={css.video} src={src} frameBorder="0" allowFullScreen />;
    }

    //TODO обработка обычного видео

    return <video id="noplayer" className={css.video} src={data.source} controls preload="auto" />;
  };

  const handleEditClick = useCallback(() => {
    onClose();
    onEditBtnClick(data);
  }, [data, onClose, onEditBtnClick]);

  return (
    <Modal onClose={onClose}>
      <div className={css.container}>
        {getVideo()}
        <h3 className={css.name}>{data.name}</h3>
        <div className={css.line} />
        <div className={css.userContainer}>
          <User needAuthorities={false} user={data.author as UserEntity} className={css.user} />
          {isEditable && <Button onClick={handleEditClick}>Редактировать</Button>}
        </div>
        {!!data.description && <div className={css.desc}>{data.description}</div>}
      </div>
    </Modal>
  );
};
