import React from 'react';
import { Input } from '@abiz/rc-aeps';

export default (props) => {

  const {
    schema,
    value=schema.default,
    disabled,
    readOnly,
    ...otherProps
  } = props;

  const handleChange = (e) => props.onChange(e.target.value);

  const allProps = {
    value,
    disabled,
    readOnly,
    onChange: handleChange,
    ...otherProps.options
  }

  return (
    <Input {...allProps} />
  );
}
