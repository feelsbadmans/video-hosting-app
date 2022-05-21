import React from 'react';
import { Checkbox as AntCheckbox, CheckboxProps } from 'antd';
import cn from 'classnames';

import css from './Checkbox.module.scss';

export const Checkbox = (props: CheckboxProps) => {
  return (
    <AntCheckbox {...props} className={cn(css.checkbox, props.className)}>
      {props.children}
    </AntCheckbox>
  );
};
