import React from 'react';
import { FieldInputProps, FieldMetaState } from 'react-final-form';
import cn from 'classnames';

import { ErrorWrapper } from 'components/ErrorWrapper';

import css from './TextareaCore.module.scss';

type TextareaCoreProps = {
  input: FieldInputProps<string, HTMLElement>;
  meta: FieldMetaState<string>;
  label: string;
  placeholder?: string;
};

export const TextareaCore: React.FC<TextareaCoreProps> = ({ input, meta, label, placeholder = '' }) => {
  const error = meta.error && meta.submitFailed && !meta.modifiedSinceLastSubmit ? (meta.error as string) : '';

  return (
    <div className={css.container}>
      <label className={css.label}>{label}</label>
      <ErrorWrapper error={error}>
        <textarea
          className={cn(css.input, (meta.active && css.focused) as string)}
          placeholder={placeholder}
          {...input}
        />
      </ErrorWrapper>
    </div>
  );
};
