import React, { FC } from 'react';
import { FieldInputProps, FieldMetaState } from 'react-final-form';
import { Select, Spin } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import { ReactComponent as Cross } from 'assets/svg/cross.svg';
import { ReactComponent as Arrow } from 'assets/svg/down-arrow.svg';

import { Checkbox } from 'components/Checkbox';
import { ErrorWrapper } from 'components/ErrorWrapper';

import css from './SelectCore.module.scss';

const { Option } = Select;

export type SelectCoreProps = {
  data: LabeledValue[];
  placeholder: string;
  disabled?: boolean;
  mode?: 'multiple' | 'tags';
  onSearch?: (search: string) => void;
  isLoading?: boolean;
};

type Props = SelectCoreProps & {
  input: FieldInputProps<LabeledValue['value'] | Array<LabeledValue['value']> | undefined>;
  meta: FieldMetaState<string>;
  label: string;
};

export const SelectCore: FC<Props> = ({
  input,
  meta,
  label,
  data,
  placeholder,
  disabled,
  mode,
  onSearch,
  isLoading,
}) => {
  const error = meta.error && meta.submitFailed && !meta.modifiedSinceLastSubmit ? (meta.error as string) : '';

  return (
    <div className={css.container}>
      <label className={css.label}>{label}</label>
      <ErrorWrapper error={error}>
        <Select
          allowClear
          showArrow
          className={css.selectField}
          clearIcon={() => {
            return <div className={css.cross}>{mode === 'multiple' || input.value ? <Cross /> : <Arrow />}</div>;
          }}
          {...input}
          defaultValue={input.value}
          disabled={disabled}
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
          loading={isLoading}
          maxTagCount={1}
          maxTagPlaceholder={(v) => <div>+{v.length}</div>}
          maxTagTextLength={18}
          menuItemSelectedIcon={null}
          mode={mode}
          onClear={() => onSearch?.('')}
          onSearch={onSearch}
          optionLabelProp="label"
          placeholder={placeholder}
          showSearch={Boolean(onSearch)}
          suffixIcon={isLoading ? <Spin size="small" /> : <Arrow />}
        >
          {data.map(({ label, value, key }) => (
            <Option key={key ?? `${value}`} label={label} value={value}>
              <div className={css.option}>
                {mode === 'multiple' && (
                  <Checkbox
                    checked={Array.isArray(input.value) ? input.value.includes(value) : input.value === value}
                    className={css.checkbox}
                  />
                )}
                &nbsp;&nbsp;<div className={css.optionContent}>{label}</div>
              </div>
            </Option>
          ))}
        </Select>
      </ErrorWrapper>
    </div>
  );
};
