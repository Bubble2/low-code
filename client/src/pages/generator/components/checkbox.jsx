import React from 'react';
import { Checkbox } from '@abiz/rc-aeps';
import ConfigForm from './hoc/configForm';

export default function radio({ value, onChange, disabled, readOnly, schema, ...otherProps}) {
  const handleChange = e => {
    onChange(e.target.checked);
  };

  return (
    <ConfigForm {...schema}>
      <Checkbox
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        checked={value}
      />
    </ConfigForm>
  );
}
