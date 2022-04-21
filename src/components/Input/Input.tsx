import React from 'react';
import { Field } from 'react-final-form';
import { InputProps as AntInputProps } from 'antd';
import { FieldValidator } from 'final-form';

import { InputCore } from './InputCore';

type InputProps = {
  name: string;
  validate?: FieldValidator<string>;
  label: string;
  placeholder?: string;
  type?: AntInputProps['type'];
};

export const Input: React.FC<InputProps> = ({ name, validate, label, placeholder, type }) => {
  return (
    <Field
      name={name}
      validate={validate}
      render={({ input, meta }) => (
        <InputCore input={input} meta={meta} label={label} placeholder={placeholder} type={type} />
      )}
    />
  );
};
