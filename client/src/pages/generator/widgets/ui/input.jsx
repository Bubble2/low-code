import React from 'react';
import { Input } from '@abiz/rc-aeps';

export default (props) => {
  const { options = {} } = props;
  const handleChange = (e) => props.onChange(e.target.value);
  return (
    <Input
        {...options}
        value={props.value}
        disabled={props.disabled || props.readOnly}
        addonAfter={
          options.addonAfter
        }
        onChange={handleChange}
      />
  );
}
