import React from 'react';
import { Field } from 'react-final-form';
import { FieldValidator } from 'final-form';

import { TextareaCore } from './TextareaCore';

type TextareaProps = {
  name: string;
  validate?: FieldValidator<string>;
  label: string;
  placeholder?: string;
};

export const Textarea: React.FC<TextareaProps> = ({ name, validate, label, placeholder }) => {
  return (
    <Field
      name={name}
      validate={validate}
      render={({ input, meta }) => <TextareaCore input={input} meta={meta} label={label} placeholder={placeholder} />}
    />
  );
};
