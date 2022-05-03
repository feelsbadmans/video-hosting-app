import { useEffect, useState } from 'react';

type PageStateOptions = {
  page: number;
  size: number;
};

export const usePageState = (options: PageStateOptions) => {
  const { page: initPage, size: initSize } = options;

  const [page, setPage] = useState(initPage);
  const [size, setSize] = useState(initSize);

  const handleSetPage = (newPage: number) => {
    setPage(newPage);
  };

  const handleSetSize = (newSize: number) => {
    setSize(newSize);
  };

  useEffect(() => {
    setPage(1);
  }, [size]);

  return {
    pageState: { page, size },
    handleSetPage,
    handleSetSize,
  };
};
