import React from 'react';
import { FieldInputProps, FieldMetaState } from 'react-final-form';
import { InputProps } from 'antd';
import cn from 'classnames';

import { ErrorWrapper } from 'components/ErrorWrapper';

import css from './InputCore.module.scss';

type InputCoreProps = {
  input: FieldInputProps<string, HTMLElement>;
  meta: FieldMetaState<string>;
  label: string;
  placeholder?: string;
  type?: InputProps['type'];
};

export const InputCore: React.FC<InputCoreProps> = ({ input, meta, label, placeholder = '', type }) => {
  const error = meta.error && meta.submitFailed && !meta.modifiedSinceLastSubmit ? (meta.error as string) : '';

  return (
    <div className={css.container}>
      <label className={css.label}>{label}</label>
      <ErrorWrapper error={error}>
        <input
          className={cn(css.input, (meta.active && css.focused) as string)}
          type={type}
          placeholder={placeholder}
          {...input}
        />
      </ErrorWrapper>
    </div>
  );
};
