import React from 'react';
import { Input } from '@abiz/rc-aeps';
import { getKeyFromUniqueId, changeKeyFromUniqueId } from '../utils';
import ConfigForm from './hoc/configForm';

export default function IdInput({
  onChange,
  value,
  disabled,
  readOnly,
  options,
  ...otherProps
}) {
  const handleChange = e => {
    try {
      const newId = changeKeyFromUniqueId(value, e.target.value);
      onChange(newId);
    } catch (error) {}
  };

  return (
    <ConfigForm {...otherProps.schema}>
      <Input
          disabled={disabled || readOnly}
          {...options}
          onChange={handleChange}
          value={getKeyFromUniqueId(value)}
      />
    </ConfigForm>
  );
}
