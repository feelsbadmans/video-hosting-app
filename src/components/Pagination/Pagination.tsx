import React from 'react';
import { Pagination as AntPagination, PaginationProps } from 'antd';

import css from './Pagination.module.scss';

export const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <div className={css.container}>
      <span className={css.containerElements}>Всего элементов:&nbsp;{props.total}</span>
      <AntPagination locale={{ items_per_page: 'на странице' }} {...props} />
    </div>
  );
};
