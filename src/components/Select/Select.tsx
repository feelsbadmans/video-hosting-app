import React from 'react';
import { Field } from 'react-final-form';

import { SelectCoreProps } from './SelectCore/SelectCore';
import { SelectCore } from './SelectCore';

type SelectProps = SelectCoreProps & {
  name: string;
  type?: string;
  label: string;
};

export const Select: React.FC<SelectProps> = ({ name, type, label, ...rest }) => {
  return (
    <Field
      name={name}
      render={({ input, meta }) => <SelectCore input={input} meta={meta} label={label} {...rest} />}
      type={type}
    />
  );
};
