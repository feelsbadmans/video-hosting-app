import React from 'react';

import { VideoProps } from '../Video';

import css from './Preview.module.scss';

type PreviewProps = VideoProps & { onClick: () => void };

export const Preview: React.FC<PreviewProps> = ({ data, onClick }) => {
  return (
    <div className={css.container} onClick={onClick}>
      {data.thumbnail.includes('videolectures') ? (
        <video src={data.thumbnail} className={css.img} />
      ) : (
        <img src={data.thumbnail} className={css.img} />
      )}
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
