import React from 'react';
import cn from 'classnames';

import css from './Spinner.module.scss';

type SpinnerProps = {
  theme?: 'light' | 'dark';
};

export const Spinner: React.FC<SpinnerProps> = ({ theme = 'dark' }) => {
  return <div className={cn(css.container, css[theme])} />;
};
