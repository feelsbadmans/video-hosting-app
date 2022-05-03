import React from 'react';
import { UserEntity } from 'api_generated';

import { Modal } from 'components/Modal';
import { User } from 'components/NavBar/components/User';

import { VideoProps } from '../Video';

import css from './PlayerModal.module.scss';

type PlayerModalProps = VideoProps & { onClick: () => void };

export const PlayerModal: React.FC<PlayerModalProps> = ({ data, onClick }) => {
  const getVideo = () => {
    let src = '';
    if (data.source.includes('youtube')) {
      src = data.source.replace('watch?v=', 'embed/');

      return <iframe id="ytplayer" className={css.video} src={src} frameBorder="0" />;
    }

    //TODO обработка обычного видео

    return null;
  };

  return (
    <Modal onClose={onClick}>
      <div className={css.container}>
        {getVideo()}
        <h3 className={css.name}>{data.name}</h3>
        <div className={css.line} />
        <User needAuthorities={false} user={data.author as UserEntity} className={css.user} />
        {!!data.description && <div className={css.desc}>{data.description}</div>}
      </div>
    </Modal>
  );
};
