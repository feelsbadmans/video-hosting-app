import React from 'react';
import cn from 'classnames';

import css from './ErrorWrapper.module.scss';

type ErrorWrapperProps = {
  error?: string;
};

export const ErrorWrapper: React.FC<ErrorWrapperProps> = ({ error, children }) => {
  return (
    <div className={cn(css.container, error && css.withError)}>
      {children}
      {error && <span className={css.errorDesc}>{error}</span>}
    </div>
  );
};
