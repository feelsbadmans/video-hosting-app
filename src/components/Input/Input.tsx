import React, { useCallback } from 'react';
import { Field, FieldInputProps } from 'react-final-form';
import { InputProps as AntInputProps } from 'antd';
import { FieldValidator } from 'final-form';

import { InputCore } from './InputCore';

type InputProps = {
  name: string;
  validate?: FieldValidator<string>;
  label: string;
  placeholder?: string;
  type?: AntInputProps['type'];
  accept?: AntInputProps['accept'];
  onChange?: AntInputProps['onChange'];
  value?: string;
};

export const Input: React.FC<InputProps> = ({ name, validate, label, placeholder, type, accept, onChange, value }) => {
  const handleChange = useCallback(
    (callback: FieldInputProps<string, HTMLElement>['onChange']) => (e: React.ChangeEvent<HTMLInputElement>) => {
      callback(e);
      if (onChange) {
        onChange(e);
      }
    },
    [onChange],
  );

  return (
    <Field
      name={name}
      validate={validate}
      render={({ input, meta }) => (
        <InputCore
          input={{
            ...input,
            onChange: handleChange(input.onChange),
            value: value || input.value,
          }}
          meta={meta}
          label={label}
          placeholder={placeholder}
          type={type}
          accept={accept}
        />
      )}
    />
  );
};
