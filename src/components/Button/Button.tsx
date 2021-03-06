import React, { FC, useMemo } from 'react';
import cn from 'classnames';

import { Spinner } from 'components/Spinner';

import { ButtonSize, ButtonView } from './types';

import css from './Button.module.scss';
type ButtonProps = {
  view?: ButtonView;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

export const Button: FC<ButtonProps> = ({
  view = 'primary',
  size = 'm',
  onClick = () => undefined,
  className = '',
  children,
  isLoading,
  type = 'button',
}) => {
  const loaderTheme = useMemo(() => (view === 'primary' ? 'dark' : 'light'), [view]);

  return (
    <button onClick={onClick} className={cn(css.button, css[view], css[size], className)} type={type}>
      {isLoading ? (
        <div className={css.spinner}>
          <Spinner theme={loaderTheme} />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
