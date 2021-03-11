import React from 'react';
import { Checkbox } from '@abiz/rc-aeps';
import ConfigForm from './hoc/configForm';

export default function radio({ value, onChange, disabled, readonly, ...otherProps}) {
  const handleChange = e => {
    onChange(e.target.checked);
  };

  return (
    <ConfigForm {...otherProps.schema}>
      <Checkbox
        disabled={disabled || readonly}
        onChange={handleChange}
        checked={value}
      />
    </ConfigForm>
  );
}
