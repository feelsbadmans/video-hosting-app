import React, { FC } from 'react';
import { Button as AntButton } from 'antd';
import cn from 'classnames';

import { ButtonSize, ButtonView } from './types';

import css from './Button.module.scss';
type ButtonProps = {
  view?: ButtonView;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

export const Button: FC<ButtonProps> = ({
  view = 'primary',
  size = 'm',
  onClick = () => undefined,
  className = '',
  children,
  type = 'button',
}) => {
  return (
    <AntButton onClick={onClick} className={cn(css.button, css[view], css[size], className)} htmlType={type}>
      {children}
    </AntButton>
  );
};
