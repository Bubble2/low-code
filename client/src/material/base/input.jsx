import React from 'react';
import { Input } from '@abiz/rc-aeps';

export default (props) => {

  const {
    schema,
    value,
    disabled,
    readOnly,
    ...otherProps
  } = props;

  const handleChange = (e) => props.onChange(e.target.value);

  const allProps = {
    value: value || schema.default,
    disabled,
    readOnly,
    onChange: handleChange,
    ...otherProps.options
  }

  return (
    <Input {...allProps} />
  );
}
