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

  const {
    title,
     href,
     target
    } = schema;

  const allProps = {
    onClick,
    disabled,
    readOnly,
    href,
    target,
    ...otherProps.options
  }

  return (
    <Button {...allProps}>{title}</Button>
  );
}
