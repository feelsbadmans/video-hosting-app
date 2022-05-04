import React, { useCallback, useState } from 'react';
import { VideoDto } from 'api/videos';

import { PlayerModal } from './PlayerModal';
import { Preview } from './Preview';

export type VideoProps = {
  data: VideoDto;
};

export const Video: React.FC<VideoProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      {isOpen && <PlayerModal data={data} onClick={toggleOpen} />}
      <div>
        <Preview data={data} onClick={toggleOpen} />
      </div>
    </>
  );
};
