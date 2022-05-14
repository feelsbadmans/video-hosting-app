import React, { useCallback, useState } from 'react';
import { VideoDto } from 'api/videos';

import { PlayerModal } from './PlayerModal';
import { Preview } from './Preview';

export type VideoProps = {
  data: VideoDto;
  isEditable?: boolean;
  onEditBtnClick?: (data: VideoDto) => void;
};

export const Video: React.FC<VideoProps> = ({ isEditable = false, onEditBtnClick = () => undefined, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      {isOpen && (
        <PlayerModal data={data} onClose={toggleOpen} isEditable={isEditable} onEditBtnClick={onEditBtnClick} />
      )}
      <Preview data={data} onClick={toggleOpen} />
    </>
  );
};
