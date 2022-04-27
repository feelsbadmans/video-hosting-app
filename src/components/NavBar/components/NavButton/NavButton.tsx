import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import css from './NavButton.module.scss';

type NavButtonProps = {
  active?: boolean;
  path: string;
};

export const NavButton: React.FC<NavButtonProps> = ({ active = false, children, path }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/${path}`)} className={cn(css.container, active ? css.active : css.default)}>
      {children}
    </div>
  );
};
