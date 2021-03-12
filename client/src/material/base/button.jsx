import React from 'react';
import { Button } from '@abiz/rc-aeps';

export default (props) => {

  const {
    schema,
    onClick,
    disabled,
    readOnly,
    ...otherProps
  } = props;

  const allProps = {
    onClick,
    disabled,
    readOnly,
    ...otherProps.options
  }

  return (
    <Button {...allProps}>{schema.title}</Button>
  );
}
