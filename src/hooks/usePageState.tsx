import { useState } from 'react';

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
    setPage(1);
    setSize(newSize);
  };

  return {
    pageState: { page, size },
    handleSetPage,
    handleSetSize,
  };
};
