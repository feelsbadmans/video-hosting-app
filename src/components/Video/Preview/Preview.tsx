import React from 'react';

import { VideoProps } from '../Video';

import { getYoutubeThumbnail } from './utils';

import css from './Preview.module.scss';

type PreviewProps = VideoProps & { onClick: () => void };

export const Preview: React.FC<PreviewProps> = ({ data, onClick }) => {
  const getPreview = () => {
    if (data.source.includes('youtube')) {
      const thumbnail = getYoutubeThumbnail(data.source, 'medium');
      if (thumbnail) {
        return <img src={thumbnail} className={css.img} />;
      }
    }

    //TODO обработка обычного видео

    return (
      <div className={css.img}>
        <span className={css.placeholder}>No image found</span>
      </div>
    );
  };

  return (
    <div className={css.container} onClick={onClick}>
      {getPreview()}
      <div className={css.text}>
        <span className={css.name} title={data.name}>
          {data.name}
        </span>
        <span className={css.author} title={data.author?.username}>
          {data.author?.username}
        </span>
      </div>
    </div>
  );
};
